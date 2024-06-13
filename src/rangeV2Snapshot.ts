import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { getUnixTimestamp } from "./helpers/numberHelper";
import { getPriceV2Contract } from "./bophades/priceV2";
import { getRangeV2Contract } from "./bophades/range";
import { getTreasuryContract } from "./bophades/treasury";
import { getOperatorContract } from "./bophades/operator";
import { RangeSnapshot } from "../generated/schema";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { ERC20 } from "../generated/PriceV2/ERC20";

const MAX_INT: BigInt = BigInt.fromString("115792089237316195423570985008687907853269984665640564039457584007913129639935");

const DECIMALS_OHM = 9;

export function createRangeV2Snapshot(token: Address, block: ethereum.Block): string {
    const unixTimestamp: BigInt = getUnixTimestamp(block.timestamp);

    const priceV2Contract = getPriceV2Contract(block);
    const rangeV2Contract = getRangeV2Contract(block);

    const treasuryContract = getTreasuryContract(block);
    const operatorContract = getOperatorContract();

    const priceDecimals = priceV2Contract.decimals();

    const priceResult = priceV2Contract.try_getPrice(
        token,
        0 // CURRENT
    );
    const movingAveragePriceResult = priceV2Contract.try_getPrice(
        token,
        2 // MOVING_AVERAGE
    );

    const entity = new RangeSnapshot(`${block.number.toString()}`);
    entity.blockchain = getChain();
    entity.block = block.number;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.timestamp = unixTimestamp;
    entity.ohmPrice = priceResult.reverted ? null : toDecimal(priceResult.value.get_price(), priceDecimals);
    entity.ohmMovingAveragePrice = movingAveragePriceResult.reverted ? null : toDecimal(movingAveragePriceResult.value.get_price(), priceDecimals);

    // Spreads are stored with 2 decimal places, e.g. 1000 = 10%
    // We convert to a decimal that can be easily multiplied, e.g. 1000 = 10% = 0.1
    const PERCENT_DECIMALS = 4;
    entity.thresholdFactor = toDecimal(rangeV2Contract.thresholdFactor(), PERCENT_DECIMALS);

    // Set spreads
    entity.cushionSpread = BigDecimal.zero();
    entity.wallSpread = BigDecimal.zero();
    entity.lowCushionSpread = toDecimal(rangeV2Contract.spread(false, false), PERCENT_DECIMALS);
    entity.lowWallSpread = toDecimal(rangeV2Contract.spread(false, true), PERCENT_DECIMALS);
    entity.highCushionSpread = toDecimal(rangeV2Contract.spread(true, false), PERCENT_DECIMALS);
    entity.highWallSpread = toDecimal(rangeV2Contract.spread(true, true), PERCENT_DECIMALS);

    entity.highActive = rangeV2Contract.active(true);
    entity.lowActive = rangeV2Contract.active(false);

    entity.highLastActiveTimestamp = getUnixTimestamp(rangeV2Contract.lastActive(true));
    entity.lowLastActiveTimestamp = getUnixTimestamp(rangeV2Contract.lastActive(false));

    entity.highCapacityOhm = toDecimal(rangeV2Contract.capacity(true), DECIMALS_OHM);
    entity.lowCapacityReserve = toDecimal(rangeV2Contract.capacity(false), priceDecimals);

    // Market ID of the cushion bond market for the side. If no market is active, the market ID is set to max uint256 value.
    const highMarketId = rangeV2Contract.market(true);
    entity.highMarketId = highMarketId.equals(MAX_INT) ? null : highMarketId;
    const lowMarketId = rangeV2Contract.market(false);
    entity.lowMarketId = lowMarketId.equals(MAX_INT) ? null : lowMarketId;

    // Set prices
    entity.highCushionPrice = toDecimal(rangeV2Contract.price(true, false), priceDecimals);
    entity.lowCushionPrice = toDecimal(rangeV2Contract.price(false, false), priceDecimals);

    entity.highWallPrice = toDecimal(rangeV2Contract.price(true, true), priceDecimals);
    entity.lowWallPrice = toDecimal(rangeV2Contract.price(false, true), priceDecimals);

    // Treasury balances
    // Normally DAI, but it is stored on the contract and we should use it
    const reserveAddressResult = operatorContract.try_reserve();
    if (!reserveAddressResult.reverted) {
        const reserveToken = ERC20.bind(reserveAddressResult.value);
        const reserveTokenDecimals = reserveToken.decimals();

        const debtBalance = toDecimal(treasuryContract.totalDebt(reserveAddressResult.value), reserveTokenDecimals);
        entity.treasuryDebtBalance = debtBalance;
        entity.treasuryReserveBalance = toDecimal(treasuryContract.getReserveBalance(reserveAddressResult.value), reserveTokenDecimals).minus(debtBalance);
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