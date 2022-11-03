import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Price } from "../generated/Price/Price";
import {
    Range,
    CushionDown,
    CushionUp,
    PricesChanged,
    SpreadsChanged,
    ThresholdFactorChanged,
    WallDown,
    WallUp
} from "../generated/Range/Range"
import { PriceEvent, PricesChangedEvent, SpreadsChangedEvent, ThresholdFactorChangedEvent } from "../generated/schema"
import { PRICE_CONTRACT } from "./constants";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";

function createPriceEvent(transaction: ethereum.Transaction, block: ethereum.Block, logIndex: BigInt, type: string, isHigh: boolean, timestamp: BigInt, capacity: BigInt | null): void {
    const unixTimestamp: BigInt = getUnixTimestamp(timestamp);
    const priceContract = Price.bind(Address.fromString(PRICE_CONTRACT));
    const decimals = priceContract.decimals();

    const entity = new PriceEvent(`${transaction.hash.toHexString()}/${logIndex.toString()}`);
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

    entity.save();
}

export function handleCushionDown(event: CushionDown): void {
    createPriceEvent(event.transaction, event.block, event.logIndex, "CushionDown", event.params.high_, event.params.timestamp_, null);
}

export function handleCushionUp(event: CushionUp): void {
    createPriceEvent(event.transaction, event.block, event.logIndex, "CushionUp", event.params.high_, event.params.timestamp_, event.params.capacity_);
}

export function handleWallDown(event: WallDown): void {
    createPriceEvent(event.transaction, event.block, event.logIndex, "WallDown", event.params.high_, event.params.timestamp_, event.params.capacity_);
}

export function handleWallUp(event: WallUp): void {
    createPriceEvent(event.transaction, event.block, event.logIndex, "WallUp", event.params.high_, event.params.timestamp_, event.params.capacity_);
}

export function handlePricesChanged(event: PricesChanged): void {
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);
    const priceContract = Price.bind(Address.fromString(PRICE_CONTRACT));
    const decimals = priceContract.decimals();

    const entity = new PricesChangedEvent(`${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`);
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
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.thresholdFactor = toDecimal(event.params.thresholdFactor_, 2);
    entity.save();
}