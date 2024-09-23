import { Address, BigInt } from "@graphprotocol/graph-ts";

import { Beat as BeatEvent, MovingAverageAssetAdded as MovingAverageAssetAddedEvent, MovingAverageAssetRemoved as MovingAverageAssetRemovedEvent, MovingAverageMetricAdded as MovingAverageMetricAddedEvent, MovingAverageMetricRemoved as MovingAverageMetricRemovedEvent, RewardIssued as RewardIssuedEvent, RewardUpdated as RewardUpdatedEvent } from "../generated/Heart_v2/Heart_v2";
import { Beat, BeatRewardIssued, BeatRewardUpdated, MovingAverageAssetChange, MovingAverageMetricChange } from "../generated/schema";
import { getMetricName } from "./bophades/appraiser";
import { ERC20_OHM_V2, ERC20_OHM_V2_DECIMALS } from "./constants";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";

export function handleBeat(event: BeatEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new Beat(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.save();
}

export function handleRewardIssued(event: RewardIssuedEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new BeatRewardIssued(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.to = event.params.to_;
  entity.rewardToken = Address.fromString(ERC20_OHM_V2);
  entity.rewardAmount = toDecimal(event.params.rewardAmount_, ERC20_OHM_V2_DECIMALS);
  entity.save()
}

export function handleRewardUpdated(event: RewardUpdatedEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new BeatRewardUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.token = Address.fromString(ERC20_OHM_V2);
  entity.rewardToken = Address.fromString(ERC20_OHM_V2);
  entity.rewardAmount = toDecimal(event.params.maxRewardAmount_, ERC20_OHM_V2_DECIMALS);
  entity.auctionDuration = event.params.auctionDuration_;
  entity.save();
}

export function handleMovingAverageAssetAdded(event: MovingAverageAssetAddedEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new MovingAverageAssetChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.heart = event.address;
  entity.asset = event.params.asset_;
  entity.added = true;

  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.save();
}

export function handleMovingAverageAssetRemoved(event: MovingAverageAssetRemovedEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new MovingAverageAssetChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.heart = event.address;
  entity.asset = event.params.asset_;
  entity.added = false;

  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.save();
}

export function handleMovingAverageMetricAdded(event: MovingAverageMetricAddedEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new MovingAverageMetricChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.heart = event.address;
  entity.metric = getMetricName(event.params.metric_);
  entity.added = true;

  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.save();
}

export function handleMovingAverageMetricRemoved(event: MovingAverageMetricRemovedEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new MovingAverageMetricChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.heart = event.address;
  entity.metric = getMetricName(event.params.metric_);
  entity.added = false;

  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.save();
}
