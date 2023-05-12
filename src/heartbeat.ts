import { Address, BigInt } from "@graphprotocol/graph-ts";

import {
  Beat as BeatEvent,
  RewardIssued as RewardIssuedEvent,
  RewardUpdated as RewardUpdatedEvent
} from "../generated/OlympusHeart/OlympusHeart"
import { RewardUpdated as RewardUpdated_v1_2_Event } from "../generated/OlympusHeart_v1_2/OlympusHeart_v1_2";
import { Beat, BeatRewardIssued, BeatRewardUpdated } from "../generated/schema"
import { ERC20_OHM_V2, ERC20_OHM_V2_DECIMALS } from "./constants";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper"

export function handleBeat(event: BeatEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new Beat(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.blockchain = getChain(event.address);
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.save();
}

export function handleRewardIssued(event: RewardIssuedEvent): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new BeatRewardIssued(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.blockchain = getChain(event.address);
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
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.blockchain = getChain(event.address);
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.token = event.params.token_;
  entity.rewardToken = Address.fromString(ERC20_OHM_V2);
  entity.rewardAmount = toDecimal(event.params.rewardAmount_, ERC20_OHM_V2_DECIMALS);
  entity.save()
}

export function handleRewardUpdated_v1_2(event: RewardUpdated_v1_2_Event): void {
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new BeatRewardUpdated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.blockchain = getChain(event.address);
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;
  entity.token = event.params.token_;
  entity.rewardToken = Address.fromString(ERC20_OHM_V2);
  entity.rewardAmount = toDecimal(event.params.maxRewardAmount_, ERC20_OHM_V2_DECIMALS);
  entity.auctionDuration = event.params.auctionDuration_;
  entity.save();
}
