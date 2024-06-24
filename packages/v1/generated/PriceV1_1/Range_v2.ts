// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class CushionDown extends ethereum.Event {
  get params(): CushionDown__Params {
    return new CushionDown__Params(this);
  }
}

export class CushionDown__Params {
  _event: CushionDown;

  constructor(event: CushionDown) {
    this._event = event;
  }

  get high_(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }

  get timestamp_(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class CushionUp extends ethereum.Event {
  get params(): CushionUp__Params {
    return new CushionUp__Params(this);
  }
}

export class CushionUp__Params {
  _event: CushionUp;

  constructor(event: CushionUp) {
    this._event = event;
  }

  get high_(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }

  get timestamp_(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get capacity_(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class PricesChanged extends ethereum.Event {
  get params(): PricesChanged__Params {
    return new PricesChanged__Params(this);
  }
}

export class PricesChanged__Params {
  _event: PricesChanged;

  constructor(event: PricesChanged) {
    this._event = event;
  }

  get wallLowPrice_(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get cushionLowPrice_(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get cushionHighPrice_(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get wallHighPrice_(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class SpreadsChanged extends ethereum.Event {
  get params(): SpreadsChanged__Params {
    return new SpreadsChanged__Params(this);
  }
}

export class SpreadsChanged__Params {
  _event: SpreadsChanged;

  constructor(event: SpreadsChanged) {
    this._event = event;
  }

  get high_(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }

  get cushionSpread_(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get wallSpread_(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ThresholdFactorChanged extends ethereum.Event {
  get params(): ThresholdFactorChanged__Params {
    return new ThresholdFactorChanged__Params(this);
  }
}

export class ThresholdFactorChanged__Params {
  _event: ThresholdFactorChanged;

  constructor(event: ThresholdFactorChanged) {
    this._event = event;
  }

  get thresholdFactor_(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class WallDown extends ethereum.Event {
  get params(): WallDown__Params {
    return new WallDown__Params(this);
  }
}

export class WallDown__Params {
  _event: WallDown;

  constructor(event: WallDown) {
    this._event = event;
  }

  get high_(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }

  get timestamp_(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get capacity_(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WallUp extends ethereum.Event {
  get params(): WallUp__Params {
    return new WallUp__Params(this);
  }
}

export class WallUp__Params {
  _event: WallUp;

  constructor(event: WallUp) {
    this._event = event;
  }

  get high_(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }

  get timestamp_(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get capacity_(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Range_v2__VERSIONResult {
  value0: i32;
  value1: i32;

  constructor(value0: i32, value1: i32) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0)),
    );
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1)),
    );
    return map;
  }

  getMajor(): i32 {
    return this.value0;
  }

  getMinor(): i32 {
    return this.value1;
  }
}

export class Range_v2__rangeResultValue0Struct extends ethereum.Tuple {
  get low(): Range_v2__rangeResultValue0LowStruct {
    return changetype<Range_v2__rangeResultValue0LowStruct>(this[0].toTuple());
  }

  get high(): Range_v2__rangeResultValue0HighStruct {
    return changetype<Range_v2__rangeResultValue0HighStruct>(this[1].toTuple());
  }
}

export class Range_v2__rangeResultValue0LowStruct extends ethereum.Tuple {
  get active(): boolean {
    return this[0].toBoolean();
  }

  get lastActive(): BigInt {
    return this[1].toBigInt();
  }

  get capacity(): BigInt {
    return this[2].toBigInt();
  }

  get threshold(): BigInt {
    return this[3].toBigInt();
  }

  get market(): BigInt {
    return this[4].toBigInt();
  }

  get cushion(): Range_v2__rangeResultValue0LowCushionStruct {
    return changetype<Range_v2__rangeResultValue0LowCushionStruct>(
      this[5].toTuple(),
    );
  }

  get wall(): Range_v2__rangeResultValue0LowWallStruct {
    return changetype<Range_v2__rangeResultValue0LowWallStruct>(
      this[6].toTuple(),
    );
  }
}

export class Range_v2__rangeResultValue0LowCushionStruct extends ethereum.Tuple {
  get price(): BigInt {
    return this[0].toBigInt();
  }

  get spread(): BigInt {
    return this[1].toBigInt();
  }
}

export class Range_v2__rangeResultValue0LowWallStruct extends ethereum.Tuple {
  get price(): BigInt {
    return this[0].toBigInt();
  }

  get spread(): BigInt {
    return this[1].toBigInt();
  }
}

export class Range_v2__rangeResultValue0HighStruct extends ethereum.Tuple {
  get active(): boolean {
    return this[0].toBoolean();
  }

  get lastActive(): BigInt {
    return this[1].toBigInt();
  }

  get capacity(): BigInt {
    return this[2].toBigInt();
  }

  get threshold(): BigInt {
    return this[3].toBigInt();
  }

  get market(): BigInt {
    return this[4].toBigInt();
  }

  get cushion(): Range_v2__rangeResultValue0HighCushionStruct {
    return changetype<Range_v2__rangeResultValue0HighCushionStruct>(
      this[5].toTuple(),
    );
  }

  get wall(): Range_v2__rangeResultValue0HighWallStruct {
    return changetype<Range_v2__rangeResultValue0HighWallStruct>(
      this[6].toTuple(),
    );
  }
}

export class Range_v2__rangeResultValue0HighCushionStruct extends ethereum.Tuple {
  get price(): BigInt {
    return this[0].toBigInt();
  }

  get spread(): BigInt {
    return this[1].toBigInt();
  }
}

export class Range_v2__rangeResultValue0HighWallStruct extends ethereum.Tuple {
  get price(): BigInt {
    return this[0].toBigInt();
  }

  get spread(): BigInt {
    return this[1].toBigInt();
  }
}

export class Range_v2 extends ethereum.SmartContract {
  static bind(address: Address): Range_v2 {
    return new Range_v2("Range_v2", address);
  }

  KEYCODE(): Bytes {
    let result = super.call("KEYCODE", "KEYCODE():(bytes5)", []);

    return result[0].toBytes();
  }

  try_KEYCODE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("KEYCODE", "KEYCODE():(bytes5)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  ONE_HUNDRED_PERCENT(): BigInt {
    let result = super.call(
      "ONE_HUNDRED_PERCENT",
      "ONE_HUNDRED_PERCENT():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_ONE_HUNDRED_PERCENT(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "ONE_HUNDRED_PERCENT",
      "ONE_HUNDRED_PERCENT():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  ONE_PERCENT(): BigInt {
    let result = super.call("ONE_PERCENT", "ONE_PERCENT():(uint256)", []);

    return result[0].toBigInt();
  }

  try_ONE_PERCENT(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("ONE_PERCENT", "ONE_PERCENT():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  VERSION(): Range_v2__VERSIONResult {
    let result = super.call("VERSION", "VERSION():(uint8,uint8)", []);

    return new Range_v2__VERSIONResult(result[0].toI32(), result[1].toI32());
  }

  try_VERSION(): ethereum.CallResult<Range_v2__VERSIONResult> {
    let result = super.tryCall("VERSION", "VERSION():(uint8,uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Range_v2__VERSIONResult(value[0].toI32(), value[1].toI32()),
    );
  }

  active(high_: boolean): boolean {
    let result = super.call("active", "active(bool):(bool)", [
      ethereum.Value.fromBoolean(high_),
    ]);

    return result[0].toBoolean();
  }

  try_active(high_: boolean): ethereum.CallResult<boolean> {
    let result = super.tryCall("active", "active(bool):(bool)", [
      ethereum.Value.fromBoolean(high_),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  capacity(high_: boolean): BigInt {
    let result = super.call("capacity", "capacity(bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
    ]);

    return result[0].toBigInt();
  }

  try_capacity(high_: boolean): ethereum.CallResult<BigInt> {
    let result = super.tryCall("capacity", "capacity(bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  kernel(): Address {
    let result = super.call("kernel", "kernel():(address)", []);

    return result[0].toAddress();
  }

  try_kernel(): ethereum.CallResult<Address> {
    let result = super.tryCall("kernel", "kernel():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  lastActive(high_: boolean): BigInt {
    let result = super.call("lastActive", "lastActive(bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
    ]);

    return result[0].toBigInt();
  }

  try_lastActive(high_: boolean): ethereum.CallResult<BigInt> {
    let result = super.tryCall("lastActive", "lastActive(bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  market(high_: boolean): BigInt {
    let result = super.call("market", "market(bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
    ]);

    return result[0].toBigInt();
  }

  try_market(high_: boolean): ethereum.CallResult<BigInt> {
    let result = super.tryCall("market", "market(bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  ohm(): Address {
    let result = super.call("ohm", "ohm():(address)", []);

    return result[0].toAddress();
  }

  try_ohm(): ethereum.CallResult<Address> {
    let result = super.tryCall("ohm", "ohm():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  price(high_: boolean, wall_: boolean): BigInt {
    let result = super.call("price", "price(bool,bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
      ethereum.Value.fromBoolean(wall_),
    ]);

    return result[0].toBigInt();
  }

  try_price(high_: boolean, wall_: boolean): ethereum.CallResult<BigInt> {
    let result = super.tryCall("price", "price(bool,bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
      ethereum.Value.fromBoolean(wall_),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  range(): Range_v2__rangeResultValue0Struct {
    let result = super.call(
      "range",
      "range():(((bool,uint48,uint256,uint256,uint256,(uint256,uint256),(uint256,uint256)),(bool,uint48,uint256,uint256,uint256,(uint256,uint256),(uint256,uint256))))",
      [],
    );

    return changetype<Range_v2__rangeResultValue0Struct>(result[0].toTuple());
  }

  try_range(): ethereum.CallResult<Range_v2__rangeResultValue0Struct> {
    let result = super.tryCall(
      "range",
      "range():(((bool,uint48,uint256,uint256,uint256,(uint256,uint256),(uint256,uint256)),(bool,uint48,uint256,uint256,uint256,(uint256,uint256),(uint256,uint256))))",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Range_v2__rangeResultValue0Struct>(value[0].toTuple()),
    );
  }

  reserve(): Address {
    let result = super.call("reserve", "reserve():(address)", []);

    return result[0].toAddress();
  }

  try_reserve(): ethereum.CallResult<Address> {
    let result = super.tryCall("reserve", "reserve():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  spread(high_: boolean, wall_: boolean): BigInt {
    let result = super.call("spread", "spread(bool,bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
      ethereum.Value.fromBoolean(wall_),
    ]);

    return result[0].toBigInt();
  }

  try_spread(high_: boolean, wall_: boolean): ethereum.CallResult<BigInt> {
    let result = super.tryCall("spread", "spread(bool,bool):(uint256)", [
      ethereum.Value.fromBoolean(high_),
      ethereum.Value.fromBoolean(wall_),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  thresholdFactor(): BigInt {
    let result = super.call(
      "thresholdFactor",
      "thresholdFactor():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_thresholdFactor(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "thresholdFactor",
      "thresholdFactor():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get kernel_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get ohm_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get reserve_(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get thresholdFactor_(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get lowSpreads_(): Array<BigInt> {
    return this._call.inputValues[4].value.toBigIntArray();
  }

  get highSpreads_(): Array<BigInt> {
    return this._call.inputValues[5].value.toBigIntArray();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class INITCall extends ethereum.Call {
  get inputs(): INITCall__Inputs {
    return new INITCall__Inputs(this);
  }

  get outputs(): INITCall__Outputs {
    return new INITCall__Outputs(this);
  }
}

export class INITCall__Inputs {
  _call: INITCall;

  constructor(call: INITCall) {
    this._call = call;
  }
}

export class INITCall__Outputs {
  _call: INITCall;

  constructor(call: INITCall) {
    this._call = call;
  }
}

export class ChangeKernelCall extends ethereum.Call {
  get inputs(): ChangeKernelCall__Inputs {
    return new ChangeKernelCall__Inputs(this);
  }

  get outputs(): ChangeKernelCall__Outputs {
    return new ChangeKernelCall__Outputs(this);
  }
}

export class ChangeKernelCall__Inputs {
  _call: ChangeKernelCall;

  constructor(call: ChangeKernelCall) {
    this._call = call;
  }

  get newKernel_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ChangeKernelCall__Outputs {
  _call: ChangeKernelCall;

  constructor(call: ChangeKernelCall) {
    this._call = call;
  }
}

export class RegenerateCall extends ethereum.Call {
  get inputs(): RegenerateCall__Inputs {
    return new RegenerateCall__Inputs(this);
  }

  get outputs(): RegenerateCall__Outputs {
    return new RegenerateCall__Outputs(this);
  }
}

export class RegenerateCall__Inputs {
  _call: RegenerateCall;

  constructor(call: RegenerateCall) {
    this._call = call;
  }

  get high_(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }

  get capacity_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RegenerateCall__Outputs {
  _call: RegenerateCall;

  constructor(call: RegenerateCall) {
    this._call = call;
  }
}

export class SetSpreadsCall extends ethereum.Call {
  get inputs(): SetSpreadsCall__Inputs {
    return new SetSpreadsCall__Inputs(this);
  }

  get outputs(): SetSpreadsCall__Outputs {
    return new SetSpreadsCall__Outputs(this);
  }
}

export class SetSpreadsCall__Inputs {
  _call: SetSpreadsCall;

  constructor(call: SetSpreadsCall) {
    this._call = call;
  }

  get high_(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }

  get cushionSpread_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get wallSpread_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SetSpreadsCall__Outputs {
  _call: SetSpreadsCall;

  constructor(call: SetSpreadsCall) {
    this._call = call;
  }
}

export class SetThresholdFactorCall extends ethereum.Call {
  get inputs(): SetThresholdFactorCall__Inputs {
    return new SetThresholdFactorCall__Inputs(this);
  }

  get outputs(): SetThresholdFactorCall__Outputs {
    return new SetThresholdFactorCall__Outputs(this);
  }
}

export class SetThresholdFactorCall__Inputs {
  _call: SetThresholdFactorCall;

  constructor(call: SetThresholdFactorCall) {
    this._call = call;
  }

  get thresholdFactor_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetThresholdFactorCall__Outputs {
  _call: SetThresholdFactorCall;

  constructor(call: SetThresholdFactorCall) {
    this._call = call;
  }
}

export class UpdateCapacityCall extends ethereum.Call {
  get inputs(): UpdateCapacityCall__Inputs {
    return new UpdateCapacityCall__Inputs(this);
  }

  get outputs(): UpdateCapacityCall__Outputs {
    return new UpdateCapacityCall__Outputs(this);
  }
}

export class UpdateCapacityCall__Inputs {
  _call: UpdateCapacityCall;

  constructor(call: UpdateCapacityCall) {
    this._call = call;
  }

  get high_(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }

  get capacity_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateCapacityCall__Outputs {
  _call: UpdateCapacityCall;

  constructor(call: UpdateCapacityCall) {
    this._call = call;
  }
}

export class UpdateMarketCall extends ethereum.Call {
  get inputs(): UpdateMarketCall__Inputs {
    return new UpdateMarketCall__Inputs(this);
  }

  get outputs(): UpdateMarketCall__Outputs {
    return new UpdateMarketCall__Outputs(this);
  }
}

export class UpdateMarketCall__Inputs {
  _call: UpdateMarketCall;

  constructor(call: UpdateMarketCall) {
    this._call = call;
  }

  get high_(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }

  get market_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get marketCapacity_(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class UpdateMarketCall__Outputs {
  _call: UpdateMarketCall;

  constructor(call: UpdateMarketCall) {
    this._call = call;
  }
}

export class UpdatePricesCall extends ethereum.Call {
  get inputs(): UpdatePricesCall__Inputs {
    return new UpdatePricesCall__Inputs(this);
  }

  get outputs(): UpdatePricesCall__Outputs {
    return new UpdatePricesCall__Outputs(this);
  }
}

export class UpdatePricesCall__Inputs {
  _call: UpdatePricesCall;

  constructor(call: UpdatePricesCall) {
    this._call = call;
  }

  get target_(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdatePricesCall__Outputs {
  _call: UpdatePricesCall;

  constructor(call: UpdatePricesCall) {
    this._call = call;
  }
}
