// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  BigInt,
  Bytes,
  Entity,
  ethereum,
  JSONValue,
  TypedMap,
} from "@graphprotocol/graph-ts";

export class Beat extends ethereum.Event {
  get params(): Beat__Params {
    return new Beat__Params(this);
  }
}

export class Beat__Params {
  _event: Beat;

  constructor(event: Beat) {
    this._event = event;
  }

  get timestamp_(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class MovingAverageAssetAdded extends ethereum.Event {
  get params(): MovingAverageAssetAdded__Params {
    return new MovingAverageAssetAdded__Params(this);
  }
}

export class MovingAverageAssetAdded__Params {
  _event: MovingAverageAssetAdded;

  constructor(event: MovingAverageAssetAdded) {
    this._event = event;
  }

  get asset_(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class MovingAverageAssetRemoved extends ethereum.Event {
  get params(): MovingAverageAssetRemoved__Params {
    return new MovingAverageAssetRemoved__Params(this);
  }
}

export class MovingAverageAssetRemoved__Params {
  _event: MovingAverageAssetRemoved;

  constructor(event: MovingAverageAssetRemoved) {
    this._event = event;
  }

  get asset_(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class MovingAverageMetricAdded extends ethereum.Event {
  get params(): MovingAverageMetricAdded__Params {
    return new MovingAverageMetricAdded__Params(this);
  }
}

export class MovingAverageMetricAdded__Params {
  _event: MovingAverageMetricAdded;

  constructor(event: MovingAverageMetricAdded) {
    this._event = event;
  }

  get metric_(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class MovingAverageMetricRemoved extends ethereum.Event {
  get params(): MovingAverageMetricRemoved__Params {
    return new MovingAverageMetricRemoved__Params(this);
  }
}

export class MovingAverageMetricRemoved__Params {
  _event: MovingAverageMetricRemoved;

  constructor(event: MovingAverageMetricRemoved) {
    this._event = event;
  }

  get metric_(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class RewardIssued extends ethereum.Event {
  get params(): RewardIssued__Params {
    return new RewardIssued__Params(this);
  }
}

export class RewardIssued__Params {
  _event: RewardIssued;

  constructor(event: RewardIssued) {
    this._event = event;
  }

  get to_(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get rewardAmount_(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class RewardUpdated extends ethereum.Event {
  get params(): RewardUpdated__Params {
    return new RewardUpdated__Params(this);
  }
}

export class RewardUpdated__Params {
  _event: RewardUpdated;

  constructor(event: RewardUpdated) {
    this._event = event;
  }

  get maxRewardAmount_(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get auctionDuration_(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Heart_v2 extends ethereum.SmartContract {
  static bind(address: Address): Heart_v2 {
    return new Heart_v2("Heart_v2", address);
  }

  currentReward(): BigInt {
    const result = super.call("currentReward", "currentReward():(uint256)", []);

    return result[0].toBigInt();
  }

  try_currentReward(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "currentReward",
      "currentReward():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  frequency(): BigInt {
    const result = super.call("frequency", "frequency():(uint48)", []);

    return result[0].toBigInt();
  }

  try_frequency(): ethereum.CallResult<BigInt> {
    const result = super.tryCall("frequency", "frequency():(uint48)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ActivateCall extends ethereum.Call {
  get inputs(): ActivateCall__Inputs {
    return new ActivateCall__Inputs(this);
  }

  get outputs(): ActivateCall__Outputs {
    return new ActivateCall__Outputs(this);
  }
}

export class ActivateCall__Inputs {
  _call: ActivateCall;

  constructor(call: ActivateCall) {
    this._call = call;
  }
}

export class ActivateCall__Outputs {
  _call: ActivateCall;

  constructor(call: ActivateCall) {
    this._call = call;
  }
}

export class BeatCall extends ethereum.Call {
  get inputs(): BeatCall__Inputs {
    return new BeatCall__Inputs(this);
  }

  get outputs(): BeatCall__Outputs {
    return new BeatCall__Outputs(this);
  }
}

export class BeatCall__Inputs {
  _call: BeatCall;

  constructor(call: BeatCall) {
    this._call = call;
  }
}

export class BeatCall__Outputs {
  _call: BeatCall;

  constructor(call: BeatCall) {
    this._call = call;
  }
}

export class DeactivateCall extends ethereum.Call {
  get inputs(): DeactivateCall__Inputs {
    return new DeactivateCall__Inputs(this);
  }

  get outputs(): DeactivateCall__Outputs {
    return new DeactivateCall__Outputs(this);
  }
}

export class DeactivateCall__Inputs {
  _call: DeactivateCall;

  constructor(call: DeactivateCall) {
    this._call = call;
  }
}

export class DeactivateCall__Outputs {
  _call: DeactivateCall;

  constructor(call: DeactivateCall) {
    this._call = call;
  }
}

export class ResetBeatCall extends ethereum.Call {
  get inputs(): ResetBeatCall__Inputs {
    return new ResetBeatCall__Inputs(this);
  }

  get outputs(): ResetBeatCall__Outputs {
    return new ResetBeatCall__Outputs(this);
  }
}

export class ResetBeatCall__Inputs {
  _call: ResetBeatCall;

  constructor(call: ResetBeatCall) {
    this._call = call;
  }
}

export class ResetBeatCall__Outputs {
  _call: ResetBeatCall;

  constructor(call: ResetBeatCall) {
    this._call = call;
  }
}

export class SetAppraiserCall extends ethereum.Call {
  get inputs(): SetAppraiserCall__Inputs {
    return new SetAppraiserCall__Inputs(this);
  }

  get outputs(): SetAppraiserCall__Outputs {
    return new SetAppraiserCall__Outputs(this);
  }
}

export class SetAppraiserCall__Inputs {
  _call: SetAppraiserCall;

  constructor(call: SetAppraiserCall) {
    this._call = call;
  }

  get appraiser_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetAppraiserCall__Outputs {
  _call: SetAppraiserCall;

  constructor(call: SetAppraiserCall) {
    this._call = call;
  }
}

export class SetDistributorCall extends ethereum.Call {
  get inputs(): SetDistributorCall__Inputs {
    return new SetDistributorCall__Inputs(this);
  }

  get outputs(): SetDistributorCall__Outputs {
    return new SetDistributorCall__Outputs(this);
  }
}

export class SetDistributorCall__Inputs {
  _call: SetDistributorCall;

  constructor(call: SetDistributorCall) {
    this._call = call;
  }

  get distributor_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetDistributorCall__Outputs {
  _call: SetDistributorCall;

  constructor(call: SetDistributorCall) {
    this._call = call;
  }
}

export class SetOperatorCall extends ethereum.Call {
  get inputs(): SetOperatorCall__Inputs {
    return new SetOperatorCall__Inputs(this);
  }

  get outputs(): SetOperatorCall__Outputs {
    return new SetOperatorCall__Outputs(this);
  }
}

export class SetOperatorCall__Inputs {
  _call: SetOperatorCall;

  constructor(call: SetOperatorCall) {
    this._call = call;
  }

  get operator_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetOperatorCall__Outputs {
  _call: SetOperatorCall;

  constructor(call: SetOperatorCall) {
    this._call = call;
  }
}

export class SetRewardAuctionParamsCall extends ethereum.Call {
  get inputs(): SetRewardAuctionParamsCall__Inputs {
    return new SetRewardAuctionParamsCall__Inputs(this);
  }

  get outputs(): SetRewardAuctionParamsCall__Outputs {
    return new SetRewardAuctionParamsCall__Outputs(this);
  }
}

export class SetRewardAuctionParamsCall__Inputs {
  _call: SetRewardAuctionParamsCall;

  constructor(call: SetRewardAuctionParamsCall) {
    this._call = call;
  }

  get maxReward_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get auctionDuration_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetRewardAuctionParamsCall__Outputs {
  _call: SetRewardAuctionParamsCall;

  constructor(call: SetRewardAuctionParamsCall) {
    this._call = call;
  }
}
