import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"

import { Price } from "../generated/Price/Price";
import {
    CushionDown,
    CushionUp,
    PricesChanged,
    Range,
    SpreadsChanged,
    ThresholdFactorChanged,
    WallDown,
    WallUp
} from "../generated/Range/Range"
import { PriceEvent, PricesChangedEvent, RangeSnapshot, SpreadsChangedEvent, ThresholdFactorChangedEvent } from "../generated/schema"
import { PRICE_CONTRACT, RANGE_CONTRACT } from "./constants";
import { CHAIN_MAINNET, getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";

const MAX_INT: BigInt = BigInt.fromU64(2**256 - 1);

function createPriceEvent(contractAddress: Address, transaction: ethereum.Transaction, block: ethereum.Block, logIndex: BigInt, type: string, isHigh: boolean, timestamp: BigInt, capacity: BigInt | null): void {
    const unixTimestamp: BigInt = getUnixTimestamp(timestamp);
    const priceContract = Price.bind(Address.fromString(PRICE_CONTRACT));
    const decimals = priceContract.decimals();

    const entity = new PriceEvent(`${transaction.hash.toHexString()}/${logIndex.toString()}`);
    entity.blockchain = getChain(contractAddress);
    entity.block = block.number;
    entity.transaction = transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.type = type;
    entity.isHigh = isHigh;
    entity.timestamp = unixTimestamp;
    entity.capacityOhm = capacity ? toDecimal(capacity, decimals) : null;

    const priceResult = priceContract.try_getCurrentPrice();
    if (!priceResult.reverted) {
        entity.price = toDecimal(priceResult.value, decimals);
    }

    const priceMovingAverageResult = priceContract.try_getMovingAverage();
    if (!priceMovingAverageResult.reverted) {
        entity.priceMovingAverage = toDecimal(priceMovingAverageResult.value, decimals);
    }

    const rangeContract = Range.bind(Address.fromString(RANGE_CONTRACT));
    const rangeResult = rangeContract.try_range();
    if (!rangeResult.reverted) {
        const result = rangeResult.value;
        entity.cushionHighPrice = toDecimal(result.cushion.high.price, 18);
        entity.cushionLowPrice = toDecimal(result.cushion.low.price, 18);
        entity.wallHighPrice = toDecimal(result.wall.high.price, 18);
        entity.wallLowPrice = toDecimal(result.wall.low.price, 18);
    }

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
    const priceContract = Price.bind(Address.fromString(PRICE_CONTRACT));
    const decimals = priceContract.decimals();

    const entity = new PricesChangedEvent(`${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`);
    entity.blockchain = getChain(event.address);
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.cushionHighPrice = toDecimal(event.params.cushionHighPrice_, decimals);
    entity.cushionLowPrice = toDecimal(event.params.cushionLowPrice_, decimals);
    entity.wallHighPrice = toDecimal(event.params.wallHighPrice_, decimals);
    entity.wallLowPrice = toDecimal(event.params.wallLowPrice_, decimals);
    entity.save();
}

export function handleSpreadsChanged(event: SpreadsChanged): void {
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const entity = new SpreadsChangedEvent(`${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`);
    entity.blockchain = getChain(event.address);
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.cushionSpread = toDecimal(event.params.cushionSpread_, 2);
    entity.wallSpread = toDecimal(event.params.wallSpread_, 2);
    entity.save();
}

export function handleThresholdFactorChanged(
    event: ThresholdFactorChanged
): void {
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const entity = new ThresholdFactorChangedEvent(`${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`);
    entity.blockchain = getChain(event.address);
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.thresholdFactor = toDecimal(event.params.thresholdFactor_, 2);
    entity.save();
}

export function handleBlock(block: ethereum.Block): void {
    const unixTimestamp: BigInt = getUnixTimestamp(block.timestamp);

    const priceContract = Price.bind(Address.fromString(PRICE_CONTRACT));
    const decimals = priceContract.decimals();
    const rangeContract = Range.bind(Address.fromString(RANGE_CONTRACT));

    const priceResult = priceContract.try_getCurrentPrice();
    const movingAveragePriceResult = priceContract.try_getMovingAverage();

    const entity = new RangeSnapshot(`${block.number.toString()}`);
    entity.blockchain = CHAIN_MAINNET;
    entity.block = block.number;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.timestamp = unixTimestamp;
    entity.ohmPrice = priceResult.reverted ? null : toDecimal(priceContract.getCurrentPrice(), decimals);
    entity.ohmMovingAveragePrice = movingAveragePriceResult.reverted ? null : toDecimal(priceContract.getMovingAverage(), decimals);

    // Spreads are stored with 2 decimal places, e.g. 1000 = 10%
    // We convert to a decimal that can be easily multiplied, e.g. 1000 = 10% = 0.1
    const PERCENT_DECIMALS = 4;
    entity.thresholdFactor = toDecimal(rangeContract.thresholdFactor(), PERCENT_DECIMALS);
    entity.cushionSpread = toDecimal(rangeContract.spread(false), PERCENT_DECIMALS);
    entity.wallSpread = toDecimal(rangeContract.spread(false), PERCENT_DECIMALS);

    entity.highActive = rangeContract.active(true);
    entity.lowActive = rangeContract.active(false);

    entity.highLastActiveTimestamp = getUnixTimestamp(rangeContract.lastActive(true));
    entity.lowLastActiveTimestamp = getUnixTimestamp(rangeContract.lastActive(false));

    entity.highCapacityOhm = toDecimal(rangeContract.capacity(true), decimals);
    entity.lowCapacityOhm = toDecimal(rangeContract.capacity(false), decimals);

    entity.highCushionPrice = toDecimal(rangeContract.price(false, true), decimals);
    entity.lowCushionPrice = toDecimal(rangeContract.price(false, false), decimals);

    // Market ID of the cushion bond market for the side. If no market is active, the market ID is set to max uint256 value.
    const highMarketId = rangeContract.market(true);
    entity.highMarketId = highMarketId.equals(MAX_INT) ? null : highMarketId;
    const lowMarketId = rangeContract.market(false);
    entity.lowMarketId = lowMarketId.equals(MAX_INT) ? null : lowMarketId;
    
    entity.highWallPrice = toDecimal(rangeContract.price(true, true), decimals);
    entity.lowWallPrice = toDecimal(rangeContract.price(true, false), decimals);
    entity.save();
}