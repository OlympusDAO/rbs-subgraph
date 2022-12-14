import { BigInt } from "@graphprotocol/graph-ts"

import {
  MovingAverageDurationChanged as MovingAverageDurationChangedEvent,
  NewObservation as NewObservationEvent,
  ObservationFrequencyChanged as ObservationFrequencyChangedEvent,
  UpdateThresholdsChanged as UpdateThresholdsChangedEvent
} from "../generated/Range/Price"
import {
  MovingAverageDurationChanged,
  NewObservation,
  ObservationFrequencyChanged,
  UpdateThresholdsChanged
} from "../generated/schema"
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";
import { createRangeSnapshot } from "./range";

export function handleNewObservation(event: NewObservationEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new NewObservation(
    `${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`
  );
  entity.blockchain = getChain(event.address);
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;

  // Create a range snapshot and link to it
  const snapshotId = createRangeSnapshot(event.block);
  entity.snapshot = snapshotId;

  entity.save();
}

// Configuration changes

export function handleMovingAverageDurationChanged(
  event: MovingAverageDurationChangedEvent
): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new MovingAverageDurationChanged(
    `${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`
  );
  entity.blockchain = getChain(event.address);
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.movingAverageDuration = event.params.movingAverageDuration_;
  entity.save();
}

export function handleObservationFrequencyChanged(
  event: ObservationFrequencyChangedEvent
): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new ObservationFrequencyChanged(
    `${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`
  );
  entity.blockchain = getChain(event.address);
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.observationFrequencySeconds = event.params.observationFrequency_;
  entity.save();
}

export function handleUpdateThresholdsChanged(
  event: UpdateThresholdsChangedEvent
): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new UpdateThresholdsChanged(
    `${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`
  );
  entity.blockchain = getChain(event.address);
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.ohmEthUpdateThresholdSeconds = event.params.ohmEthUpdateThreshold_;
  entity.reserveEthUpdateThresholdSeconds = event.params.reserveEthUpdateThreshold_;
  entity.save();
}
