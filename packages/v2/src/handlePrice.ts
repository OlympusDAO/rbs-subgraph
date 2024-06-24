import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";

import { PriceStored } from "../generated/Price_v2/Price_v2";
import { NewObservation } from "../generated/schema";
import { ERC20_OHM_V2 } from "./constants";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";
import { createRangeV2Snapshot } from "./rangeV2Snapshot";

export function handlePriceStored(event: PriceStored): void {
    // Filter out observations that aren't OHM
    // This mimics the NewObservation event in PRICE v1, which was only emitted for OHM
    if (event.params.asset_.toHexString().toLowerCase() != ERC20_OHM_V2.toLowerCase()) {
        return;
    }

    log.debug("New observation at block {}", [event.block.number.toString()]);
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const entity = new NewObservation(
      `${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`
    );
    entity.blockchain = getChain();
    entity.block = event.block.number;
    entity.transaction = event.transaction.hash;
    entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    entity.timestamp = unixTimestamp;

    // Create a range snapshot and link to it
    const snapshotId: Bytes = createRangeV2Snapshot(event.params.asset_, event.block);
    entity.snapshot = snapshotId;

    entity.save();
  }
