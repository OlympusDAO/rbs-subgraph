import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";

import { AssetAdded as AssetAddedEvent, AssetRemoved as AssetRemovedEvent, PriceStored as PriceStoredEvent } from "../generated/Price_v2/Price_v2";
import { AssetAdded, AssetRemoved, PriceStored } from "../generated/schema";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";
import { getOrCreateToken } from "./helpers/token";
import { createRangeSnapshot } from "./rangeSnapshot";

export function handlePriceStored(event: PriceStoredEvent): void {
  log.debug("New observation at block {}", [event.block.number.toString()]);
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new PriceStored(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;

  // Create a range snapshot and link to it
  const snapshotId: Bytes = createRangeSnapshot(event.params.asset_, event.block);
  entity.snapshot = snapshotId;

  entity.asset = event.params.asset_;

  const token = getOrCreateToken(event.params.asset_);
  entity.price = toDecimal(event.params.price_, token.decimals);

  entity.save();
}

export function handleAssetAdded(event: AssetAddedEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new AssetAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;

  entity.asset = event.params.asset_;

  entity.save();
}

export function handleAssetRemoved(event: AssetRemovedEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new AssetRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;

  entity.asset = event.params.asset_;

  entity.save();
}
