import { Address, BigInt } from "@graphprotocol/graph-ts"

import {
  MovingAverageDurationChanged as MovingAverageDurationChangedEvent,
  NewObservation as NewObservationEvent,
  ObservationFrequencyChanged as ObservationFrequencyChangedEvent,
  Price,
  UpdateThresholdsChanged as UpdateThresholdsChangedEvent
} from "../generated/Price/Price"
import { Range } from "../generated/Range/Range";
import {
  MovingAverageDurationChanged,
  NewObservation,
  ObservationFrequencyChanged,
  UpdateThresholdsChanged
} from "../generated/schema"
import { PRICE_CONTRACT, RANGE_CONTRACT } from "./constants";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";

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

export function handleNewObservation(event: NewObservationEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);
  const priceContract = Price.bind(Address.fromString(PRICE_CONTRACT));
  const decimals = priceContract.decimals();

  const entity = new NewObservation(
    `${event.transaction.hash.toHexString()}/${event.logIndex.toString()}`
  );
  entity.blockchain = getChain(event.address);
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;

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
