import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";

import { CushionUp } from "../generated/Price_v2/Range_v2";
import { CushionDown, PricesChanged, SpreadsChanged, ThresholdFactorChanged, WallDown, WallUp } from "../generated/Range_v2/Range_v2";
import { PriceEvent, PricesChangedEvent, SpreadsChangedEvent, ThresholdFactorChangedEvent } from "../generated/schema";
import { ERC20_OHM_V2 } from "./constants";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";
import { createRangeSnapshot } from "./rangeSnapshot";

function createPriceEvent(contractAddress: Address, transaction: ethereum.Transaction, block: ethereum.Block, logIndex: BigInt, type: string, isHigh: boolean, timestamp: BigInt, _capacity: BigInt | null): void {
    const unixTimestamp: BigInt = getUnixTimestamp(timestamp);

    const entity = new PriceEvent(transaction.hash.concatI32(logIndex.toI32()));
    entity.blockchain = getChain();
    entity.block = block.number;
    entity.transaction = transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.type = type;
    entity.isHigh = isHigh;
    entity.timestamp = unixTimestamp;

    // Create a range snapshot and link to it
    const snapshotId = createRangeSnapshot(Address.fromString(ERC20_OHM_V2), block);
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

    const entity = new PricesChangedEvent(event.transaction.hash.concatI32(event.logIndex.toI32()));
    entity.blockchain = getChain();
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());

    // Create a range snapshot and link to it
    const snapshotId = createRangeSnapshot(Address.fromString(ERC20_OHM_V2), event.block);
    entity.snapshot = snapshotId;

    entity.save();
}

export function handleSpreadsChanged(event: SpreadsChanged): void {
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const entity = new SpreadsChangedEvent(event.transaction.hash.concatI32(event.logIndex.toI32()));
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

    const entity = new ThresholdFactorChangedEvent(event.transaction.hash.concatI32(event.logIndex.toI32()));
    entity.blockchain = getChain();
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.thresholdFactor = toDecimal(event.params.thresholdFactor_, 2);
    entity.save();
}

export function handleBlock(block: ethereum.Block): void {
    createRangeSnapshot(Address.fromString(ERC20_OHM_V2), block);
}
