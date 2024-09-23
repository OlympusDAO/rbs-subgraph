import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts"

import {
    CushionDown,
    CushionUp,
    PricesChanged,
    SpreadsChanged,
    ThresholdFactorChanged,
    WallDown,
    WallUp
} from "../generated/Range/Range"
import {
    Range_v2,
    SpreadsChanged as SpreadsChanged_v2
} from "../generated/Range_v2/Range_v2";
import { PriceEvent, PricesChangedEvent, RangeSnapshot, SpreadsChangedEvent, ThresholdFactorChangedEvent } from "../generated/schema"
import { getOperatorContract } from "./bophades/operator";
import { getPriceContract } from "./bophades/price";
import { getRangeContract } from "./bophades/range";
import { getTreasuryContract } from "./bophades/treasury";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";

const MAX_INT: BigInt = BigInt.fromString("115792089237316195423570985008687907853269984665640564039457584007913129639935");
const DECIMALS_OHM = 9;

const PRICE_DECIMALS = 18;
const RESERVE_TOKEN_DECIMALS = 18;

export function createRangeSnapshot(block: ethereum.Block): string {
    const unixTimestamp: BigInt = getUnixTimestamp(block.timestamp);

    const priceContract = getPriceContract(block);
    const rangeContract = getRangeContract(block);
    const rangeV2Contract: Range_v2 | null = rangeContract.VERSION().getMajor() == 2 ? Range_v2.bind(rangeContract._address) : null;

    const treasuryContract = getTreasuryContract(block);
    const operatorContract = getOperatorContract();

    const priceResult = priceContract.try_getCurrentPrice();
    const movingAveragePriceResult = priceContract.try_getMovingAverage();

    const entity = new RangeSnapshot(`${block.number.toString()}`);
    entity.blockchain = getChain();
    entity.block = block.number;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.timestamp = unixTimestamp;
    entity.ohmPrice = priceResult.reverted ? null : toDecimal(priceResult.value, PRICE_DECIMALS);
    entity.ohmMovingAveragePrice = movingAveragePriceResult.reverted ? null : toDecimal(movingAveragePriceResult.value, PRICE_DECIMALS);

    // Spreads are stored with 2 decimal places, e.g. 1000 = 10%
    // We convert to a decimal that can be easily multiplied, e.g. 1000 = 10% = 0.1
    const PERCENT_DECIMALS = 4;
    entity.thresholdFactor = toDecimal(rangeContract.thresholdFactor(), PERCENT_DECIMALS);

    // Set spreads
    if (rangeV2Contract !== null) {
        entity.cushionSpread = BigDecimal.zero();
        entity.wallSpread = BigDecimal.zero();
        entity.lowCushionSpread = toDecimal(rangeV2Contract.spread(false, false), PERCENT_DECIMALS);
        entity.lowWallSpread = toDecimal(rangeV2Contract.spread(false, true), PERCENT_DECIMALS);
        entity.highCushionSpread = toDecimal(rangeV2Contract.spread(true, false), PERCENT_DECIMALS);
        entity.highWallSpread = toDecimal(rangeV2Contract.spread(true, true), PERCENT_DECIMALS);
    }
    else {
        entity.cushionSpread = toDecimal(rangeContract.spread(false), PERCENT_DECIMALS);
        entity.wallSpread = toDecimal(rangeContract.spread(true), PERCENT_DECIMALS);
    }

    entity.highActive = rangeContract.active(true);
    entity.lowActive = rangeContract.active(false);

    entity.highLastActiveTimestamp = getUnixTimestamp(rangeContract.lastActive(true));
    entity.lowLastActiveTimestamp = getUnixTimestamp(rangeContract.lastActive(false));

    entity.highCapacityOhm = toDecimal(rangeContract.capacity(true), DECIMALS_OHM);
    entity.lowCapacityReserve = toDecimal(rangeContract.capacity(false), PRICE_DECIMALS);

    // Market ID of the cushion bond market for the side. If no market is active, the market ID is set to max uint256 value.
    const highMarketId = rangeContract.market(true);
    entity.highMarketId = highMarketId.equals(MAX_INT) ? null : highMarketId;
    const lowMarketId = rangeContract.market(false);
    entity.lowMarketId = lowMarketId.equals(MAX_INT) ? null : lowMarketId;

    // Set prices
    // Range v2 flipped the order of parameters, so check for that
    if (rangeV2Contract != null) {
        entity.highCushionPrice = toDecimal(rangeV2Contract.price(true, false), PRICE_DECIMALS);
        entity.lowCushionPrice = toDecimal(rangeV2Contract.price(false, false), PRICE_DECIMALS);

        entity.highWallPrice = toDecimal(rangeV2Contract.price(true, true), PRICE_DECIMALS);
        entity.lowWallPrice = toDecimal(rangeV2Contract.price(false, true), PRICE_DECIMALS);
    }
    else {
        entity.highCushionPrice = toDecimal(rangeContract.price(false, true), PRICE_DECIMALS);
        entity.lowCushionPrice = toDecimal(rangeContract.price(false, false), PRICE_DECIMALS);

        entity.highWallPrice = toDecimal(rangeContract.price(true, true), PRICE_DECIMALS);
        entity.lowWallPrice = toDecimal(rangeContract.price(true, false), PRICE_DECIMALS);
    }

    // Treasury balances
    // Normally DAI, but it is stored on the contract and we should use it
    const reserveAddressResult = operatorContract.try_reserve();
    if (!reserveAddressResult.reverted) {
        const debtBalance = toDecimal(treasuryContract.totalDebt(reserveAddressResult.value), RESERVE_TOKEN_DECIMALS);
        entity.treasuryDebtBalance = debtBalance;
        entity.treasuryReserveBalance = toDecimal(treasuryContract.getReserveBalance(reserveAddressResult.value), RESERVE_TOKEN_DECIMALS).minus(debtBalance);
        entity.treasuryReserveAddress = reserveAddressResult.value;
    }

    // Operator config
    const operatorConfigResult = operatorContract.try_config();
    if (!operatorConfigResult.reverted) {
        entity.operatorReserveFactor = toDecimal(operatorConfigResult.value.reserveFactor, PERCENT_DECIMALS);
        entity.operatorCushionFactor = toDecimal(operatorConfigResult.value.cushionFactor, PERCENT_DECIMALS);
    }

    entity.save();

    return entity.id;
}

function createPriceEvent(contractAddress: Address, transaction: ethereum.Transaction, block: ethereum.Block, logIndex: BigInt, type: string, isHigh: boolean, timestamp: BigInt, _capacity: BigInt | null): void {
    const unixTimestamp: BigInt = getUnixTimestamp(timestamp);

    const entity = new PriceEvent(`${transaction.hash.toHexString()}/${logIndex.toString()}`);
    entity.blockchain = getChain();
    entity.block = block.number;
    entity.transaction = transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.type = type;
    entity.isHigh = isHigh;
    entity.timestamp = unixTimestamp;

    // Create a range snapshot and link to it
    const snapshotId = createRangeSnapshot(block);
    entity.snapshot = snapshotId;

    entity.save();
}

export function handleCushionDown(event: CushionDown): void {
    createPriceEvent(event.address, event.transaction, event.block, event.logIndex, "CushionDown", event.params.high_, event.params.timestamp_, null);
}

export function handleCushionUp(event: CushionUp): void {
    createPriceEvent(event.address, event.transaction, event.block, event.logIndex, "CushionUp", event.params.high_, event.params.timestamp_, event.params.capacity_);
}

export function handleWallDown(event: WallDown): void {
    createPriceEvent(event.address, event.transaction, event.block, event.logIndex, "WallDown", event.params.high_, event.params.timestamp_, event.params.capacity_);
}

export function handleWallUp(event: WallUp): void {
    createPriceEvent(event.address, event.transaction, event.block, event.logIndex, "WallUp", event.params.high_, event.params.timestamp_, event.params.capacity_);
}

export function handlePricesChanged(event: PricesChanged): void {
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const entity = new PricesChangedEvent(`${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`);
    entity.blockchain = getChain();
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());

    // Create a range snapshot and link to it
    const snapshotId = createRangeSnapshot(event.block);
    entity.snapshot = snapshotId;

    entity.save();
}

export function handleSpreadsChanged(event: SpreadsChanged): void {
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const entity = new SpreadsChangedEvent(`${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`);
    entity.blockchain = getChain();
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.cushionSpread = toDecimal(event.params.cushionSpread_, 2);
    entity.wallSpread = toDecimal(event.params.wallSpread_, 2);
    entity.save();
}

export function handleSpreadsChanged_v2(event: SpreadsChanged_v2): void {
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const entity = new SpreadsChangedEvent(`${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`);
    entity.blockchain = getChain();
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.high = event.params.high_;
    entity.cushionSpread = toDecimal(event.params.cushionSpread_, 2);
    entity.wallSpread = toDecimal(event.params.wallSpread_, 2);
    entity.save();
}

export function handleThresholdFactorChanged(
    event: ThresholdFactorChanged
): void {
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const entity = new ThresholdFactorChangedEvent(`${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`);
    entity.blockchain = getChain();
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.thresholdFactor = toDecimal(event.params.thresholdFactor_, 2);
    entity.save();
}

export function handleBlock(block: ethereum.Block): void {
    createRangeSnapshot(block);
}
