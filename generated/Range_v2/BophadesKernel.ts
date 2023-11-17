// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  BigInt,
  Bytes,
  Entity,
  ethereum,
  JSONValue,
  TypedMap} from "@graphprotocol/graph-ts";

export class ActionExecuted extends ethereum.Event {
  get params(): ActionExecuted__Params {
    return new ActionExecuted__Params(this);
  }
}

export class ActionExecuted__Params {
  _event: ActionExecuted;

  constructor(event: ActionExecuted) {
    this._event = event;
  }

  get action_(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get target_(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PermissionsUpdated extends ethereum.Event {
  get params(): PermissionsUpdated__Params {
    return new PermissionsUpdated__Params(this);
  }
}

export class PermissionsUpdated__Params {
  _event: PermissionsUpdated;

  constructor(event: PermissionsUpdated) {
    this._event = event;
  }

  get keycode_(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get policy_(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get funcSelector_(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get granted_(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class BophadesKernel extends ethereum.SmartContract {
  static bind(address: Address): BophadesKernel {
    return new BophadesKernel("BophadesKernel", address);
  }

  activePolicies(param0: BigInt): Address {
    const result = super.call(
      "activePolicies",
      "activePolicies(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_activePolicies(param0: BigInt): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "activePolicies",
      "activePolicies(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  allKeycodes(param0: BigInt): Bytes {
    const result = super.call("allKeycodes", "allKeycodes(uint256):(bytes5)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toBytes();
  }

  try_allKeycodes(param0: BigInt): ethereum.CallResult<Bytes> {
    const result = super.tryCall("allKeycodes", "allKeycodes(uint256):(bytes5)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  executor(): Address {
    const result = super.call("executor", "executor():(address)", []);

    return result[0].toAddress();
  }

  try_executor(): ethereum.CallResult<Address> {
    const result = super.tryCall("executor", "executor():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getDependentIndex(param0: Bytes, param1: Address): BigInt {
    const result = super.call(
      "getDependentIndex",
      "getDependentIndex(bytes5,address):(uint256)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_getDependentIndex(
    param0: Bytes,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "getDependentIndex",
      "getDependentIndex(bytes5,address):(uint256)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getKeycodeForModule(param0: Address): Bytes {
    const result = super.call(
      "getKeycodeForModule",
      "getKeycodeForModule(address):(bytes5)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBytes();
  }

  try_getKeycodeForModule(param0: Address): ethereum.CallResult<Bytes> {
    const result = super.tryCall(
      "getKeycodeForModule",
      "getKeycodeForModule(address):(bytes5)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getModuleForKeycode(param0: Bytes): Address {
    const result = super.call(
      "getModuleForKeycode",
      "getModuleForKeycode(bytes5):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );

    return result[0].toAddress();
  }

  try_getModuleForKeycode(param0: Bytes): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "getModuleForKeycode",
      "getModuleForKeycode(bytes5):(address)",
      [ethereum.Value.fromFixedBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getPolicyIndex(param0: Address): BigInt {
    const result = super.call(
      "getPolicyIndex",
      "getPolicyIndex(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_getPolicyIndex(param0: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "getPolicyIndex",
      "getPolicyIndex(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isPolicyActive(policy_: Address): boolean {
    const result = super.call(
      "isPolicyActive",
      "isPolicyActive(address):(bool)",
      [ethereum.Value.fromAddress(policy_)]
    );

    return result[0].toBoolean();
  }

  try_isPolicyActive(policy_: Address): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "isPolicyActive",
      "isPolicyActive(address):(bool)",
      [ethereum.Value.fromAddress(policy_)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  moduleDependents(param0: Bytes, param1: BigInt): Address {
    const result = super.call(
      "moduleDependents",
      "moduleDependents(bytes5,uint256):(address)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toAddress();
  }

  try_moduleDependents(
    param0: Bytes,
    param1: BigInt
  ): ethereum.CallResult<Address> {
    const result = super.tryCall(
      "moduleDependents",
      "moduleDependents(bytes5,uint256):(address)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  modulePermissions(param0: Bytes, param1: Address, param2: Bytes): boolean {
    const result = super.call(
      "modulePermissions",
      "modulePermissions(bytes5,address,bytes4):(bool)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2)
      ]
    );

    return result[0].toBoolean();
  }

  try_modulePermissions(
    param0: Bytes,
    param1: Address,
    param2: Bytes
  ): ethereum.CallResult<boolean> {
    const result = super.tryCall(
      "modulePermissions",
      "modulePermissions(bytes5,address,bytes4):(bool)",
      [
        ethereum.Value.fromFixedBytes(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
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
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ExecuteActionCall extends ethereum.Call {
  get inputs(): ExecuteActionCall__Inputs {
    return new ExecuteActionCall__Inputs(this);
  }

  get outputs(): ExecuteActionCall__Outputs {
    return new ExecuteActionCall__Outputs(this);
  }
}

export class ExecuteActionCall__Inputs {
  _call: ExecuteActionCall;

  constructor(call: ExecuteActionCall) {
    this._call = call;
  }

  get action_(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get target_(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ExecuteActionCall__Outputs {
  _call: ExecuteActionCall;

  constructor(call: ExecuteActionCall) {
    this._call = call;
  }
}
