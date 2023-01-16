// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  BigDecimal,
  BigInt,
  Bytes,
  Entity,
  store,
  TypedMap,
  Value,
  ValueKind} from "@graphprotocol/graph-ts";

export class RangeSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save RangeSnapshot entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type RangeSnapshot must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("RangeSnapshot", id.toString(), this);
    }
  }

  static load(id: string): RangeSnapshot | null {
    return changetype<RangeSnapshot | null>(store.get("RangeSnapshot", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get ohmPrice(): BigDecimal | null {
    const value = this.get("ohmPrice");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set ohmPrice(value: BigDecimal | null) {
    if (!value) {
      this.unset("ohmPrice");
    } else {
      this.set("ohmPrice", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get ohmMovingAveragePrice(): BigDecimal | null {
    const value = this.get("ohmMovingAveragePrice");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set ohmMovingAveragePrice(value: BigDecimal | null) {
    if (!value) {
      this.unset("ohmMovingAveragePrice");
    } else {
      this.set(
        "ohmMovingAveragePrice",
        Value.fromBigDecimal(<BigDecimal>value)
      );
    }
  }

  get thresholdFactor(): BigDecimal {
    const value = this.get("thresholdFactor");
    return value!.toBigDecimal();
  }

  set thresholdFactor(value: BigDecimal) {
    this.set("thresholdFactor", Value.fromBigDecimal(value));
  }

  get cushionSpread(): BigDecimal {
    const value = this.get("cushionSpread");
    return value!.toBigDecimal();
  }

  set cushionSpread(value: BigDecimal) {
    this.set("cushionSpread", Value.fromBigDecimal(value));
  }

  get wallSpread(): BigDecimal {
    const value = this.get("wallSpread");
    return value!.toBigDecimal();
  }

  set wallSpread(value: BigDecimal) {
    this.set("wallSpread", Value.fromBigDecimal(value));
  }

  get highActive(): boolean {
    const value = this.get("highActive");
    return value!.toBoolean();
  }

  set highActive(value: boolean) {
    this.set("highActive", Value.fromBoolean(value));
  }

  get lowActive(): boolean {
    const value = this.get("lowActive");
    return value!.toBoolean();
  }

  set lowActive(value: boolean) {
    this.set("lowActive", Value.fromBoolean(value));
  }

  get highLastActiveTimestamp(): BigInt {
    const value = this.get("highLastActiveTimestamp");
    return value!.toBigInt();
  }

  set highLastActiveTimestamp(value: BigInt) {
    this.set("highLastActiveTimestamp", Value.fromBigInt(value));
  }

  get lowLastActiveTimestamp(): BigInt {
    const value = this.get("lowLastActiveTimestamp");
    return value!.toBigInt();
  }

  set lowLastActiveTimestamp(value: BigInt) {
    this.set("lowLastActiveTimestamp", Value.fromBigInt(value));
  }

  get highCapacityOhm(): BigDecimal {
    const value = this.get("highCapacityOhm");
    return value!.toBigDecimal();
  }

  set highCapacityOhm(value: BigDecimal) {
    this.set("highCapacityOhm", Value.fromBigDecimal(value));
  }

  get lowCapacityReserve(): BigDecimal {
    const value = this.get("lowCapacityReserve");
    return value!.toBigDecimal();
  }

  set lowCapacityReserve(value: BigDecimal) {
    this.set("lowCapacityReserve", Value.fromBigDecimal(value));
  }

  get highCushionPrice(): BigDecimal {
    const value = this.get("highCushionPrice");
    return value!.toBigDecimal();
  }

  set highCushionPrice(value: BigDecimal) {
    this.set("highCushionPrice", Value.fromBigDecimal(value));
  }

  get lowCushionPrice(): BigDecimal {
    const value = this.get("lowCushionPrice");
    return value!.toBigDecimal();
  }

  set lowCushionPrice(value: BigDecimal) {
    this.set("lowCushionPrice", Value.fromBigDecimal(value));
  }

  get highMarketId(): BigInt | null {
    const value = this.get("highMarketId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set highMarketId(value: BigInt | null) {
    if (!value) {
      this.unset("highMarketId");
    } else {
      this.set("highMarketId", Value.fromBigInt(<BigInt>value));
    }
  }

  get lowMarketId(): BigInt | null {
    const value = this.get("lowMarketId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set lowMarketId(value: BigInt | null) {
    if (!value) {
      this.unset("lowMarketId");
    } else {
      this.set("lowMarketId", Value.fromBigInt(<BigInt>value));
    }
  }

  get highWallPrice(): BigDecimal {
    const value = this.get("highWallPrice");
    return value!.toBigDecimal();
  }

  set highWallPrice(value: BigDecimal) {
    this.set("highWallPrice", Value.fromBigDecimal(value));
  }

  get lowWallPrice(): BigDecimal {
    const value = this.get("lowWallPrice");
    return value!.toBigDecimal();
  }

  set lowWallPrice(value: BigDecimal) {
    this.set("lowWallPrice", Value.fromBigDecimal(value));
  }

  get treasuryReserveAddress(): Bytes | null {
    const value = this.get("treasuryReserveAddress");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set treasuryReserveAddress(value: Bytes | null) {
    if (!value) {
      this.unset("treasuryReserveAddress");
    } else {
      this.set("treasuryReserveAddress", Value.fromBytes(<Bytes>value));
    }
  }

  get treasuryReserveBalance(): BigDecimal | null {
    const value = this.get("treasuryReserveBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set treasuryReserveBalance(value: BigDecimal | null) {
    if (!value) {
      this.unset("treasuryReserveBalance");
    } else {
      this.set(
        "treasuryReserveBalance",
        Value.fromBigDecimal(<BigDecimal>value)
      );
    }
  }

  get treasuryDebtBalance(): BigDecimal | null {
    const value = this.get("treasuryDebtBalance");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set treasuryDebtBalance(value: BigDecimal | null) {
    if (!value) {
      this.unset("treasuryDebtBalance");
    } else {
      this.set("treasuryDebtBalance", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get operatorReserveFactor(): BigDecimal | null {
    const value = this.get("operatorReserveFactor");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set operatorReserveFactor(value: BigDecimal | null) {
    if (!value) {
      this.unset("operatorReserveFactor");
    } else {
      this.set(
        "operatorReserveFactor",
        Value.fromBigDecimal(<BigDecimal>value)
      );
    }
  }

  get operatorCushionFactor(): BigDecimal | null {
    const value = this.get("operatorCushionFactor");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set operatorCushionFactor(value: BigDecimal | null) {
    if (!value) {
      this.unset("operatorCushionFactor");
    } else {
      this.set(
        "operatorCushionFactor",
        Value.fromBigDecimal(<BigDecimal>value)
      );
    }
  }
}

export class PriceEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save PriceEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PriceEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PriceEvent", id.toString(), this);
    }
  }

  static load(id: string): PriceEvent | null {
    return changetype<PriceEvent | null>(store.get("PriceEvent", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get type(): string {
    const value = this.get("type");
    return value!.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get isHigh(): boolean {
    const value = this.get("isHigh");
    return value!.toBoolean();
  }

  set isHigh(value: boolean) {
    this.set("isHigh", Value.fromBoolean(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get snapshot(): string {
    const value = this.get("snapshot");
    return value!.toString();
  }

  set snapshot(value: string) {
    this.set("snapshot", Value.fromString(value));
  }
}

export class PricesChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save PricesChangedEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PricesChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PricesChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): PricesChangedEvent | null {
    return changetype<PricesChangedEvent | null>(
      store.get("PricesChangedEvent", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get snapshot(): string {
    const value = this.get("snapshot");
    return value!.toString();
  }

  set snapshot(value: string) {
    this.set("snapshot", Value.fromString(value));
  }
}

export class SpreadsChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save SpreadsChangedEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SpreadsChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SpreadsChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): SpreadsChangedEvent | null {
    return changetype<SpreadsChangedEvent | null>(
      store.get("SpreadsChangedEvent", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get cushionSpread(): BigDecimal {
    const value = this.get("cushionSpread");
    return value!.toBigDecimal();
  }

  set cushionSpread(value: BigDecimal) {
    this.set("cushionSpread", Value.fromBigDecimal(value));
  }

  get wallSpread(): BigDecimal {
    const value = this.get("wallSpread");
    return value!.toBigDecimal();
  }

  set wallSpread(value: BigDecimal) {
    this.set("wallSpread", Value.fromBigDecimal(value));
  }
}

export class ThresholdFactorChangedEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(
      id != null,
      "Cannot save ThresholdFactorChangedEvent entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ThresholdFactorChangedEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ThresholdFactorChangedEvent", id.toString(), this);
    }
  }

  static load(id: string): ThresholdFactorChangedEvent | null {
    return changetype<ThresholdFactorChangedEvent | null>(
      store.get("ThresholdFactorChangedEvent", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get thresholdFactor(): BigDecimal {
    const value = this.get("thresholdFactor");
    return value!.toBigDecimal();
  }

  set thresholdFactor(value: BigDecimal) {
    this.set("thresholdFactor", Value.fromBigDecimal(value));
  }
}

export class MovingAverageDurationChanged extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(
      id != null,
      "Cannot save MovingAverageDurationChanged entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type MovingAverageDurationChanged must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("MovingAverageDurationChanged", id.toString(), this);
    }
  }

  static load(id: string): MovingAverageDurationChanged | null {
    return changetype<MovingAverageDurationChanged | null>(
      store.get("MovingAverageDurationChanged", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get movingAverageDuration(): BigInt {
    const value = this.get("movingAverageDuration");
    return value!.toBigInt();
  }

  set movingAverageDuration(value: BigInt) {
    this.set("movingAverageDuration", Value.fromBigInt(value));
  }
}

export class NewObservation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save NewObservation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type NewObservation must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("NewObservation", id.toString(), this);
    }
  }

  static load(id: string): NewObservation | null {
    return changetype<NewObservation | null>(store.get("NewObservation", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get snapshot(): string {
    const value = this.get("snapshot");
    return value!.toString();
  }

  set snapshot(value: string) {
    this.set("snapshot", Value.fromString(value));
  }
}

export class ObservationFrequencyChanged extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(
      id != null,
      "Cannot save ObservationFrequencyChanged entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ObservationFrequencyChanged must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ObservationFrequencyChanged", id.toString(), this);
    }
  }

  static load(id: string): ObservationFrequencyChanged | null {
    return changetype<ObservationFrequencyChanged | null>(
      store.get("ObservationFrequencyChanged", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get observationFrequencySeconds(): BigInt {
    const value = this.get("observationFrequencySeconds");
    return value!.toBigInt();
  }

  set observationFrequencySeconds(value: BigInt) {
    this.set("observationFrequencySeconds", Value.fromBigInt(value));
  }
}

export class UpdateThresholdsChanged extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(
      id != null,
      "Cannot save UpdateThresholdsChanged entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type UpdateThresholdsChanged must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("UpdateThresholdsChanged", id.toString(), this);
    }
  }

  static load(id: string): UpdateThresholdsChanged | null {
    return changetype<UpdateThresholdsChanged | null>(
      store.get("UpdateThresholdsChanged", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get ohmEthUpdateThresholdSeconds(): BigInt {
    const value = this.get("ohmEthUpdateThresholdSeconds");
    return value!.toBigInt();
  }

  set ohmEthUpdateThresholdSeconds(value: BigInt) {
    this.set("ohmEthUpdateThresholdSeconds", Value.fromBigInt(value));
  }

  get reserveEthUpdateThresholdSeconds(): BigInt {
    const value = this.get("reserveEthUpdateThresholdSeconds");
    return value!.toBigInt();
  }

  set reserveEthUpdateThresholdSeconds(value: BigInt) {
    this.set("reserveEthUpdateThresholdSeconds", Value.fromBigInt(value));
  }
}

export class MinimumTargetPriceChanged extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(
      id != null,
      "Cannot save MinimumTargetPriceChanged entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type MinimumTargetPriceChanged must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("MinimumTargetPriceChanged", id.toString(), this);
    }
  }

  static load(id: string): MinimumTargetPriceChanged | null {
    return changetype<MinimumTargetPriceChanged | null>(
      store.get("MinimumTargetPriceChanged", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get minimumTargetPrice(): BigDecimal {
    const value = this.get("minimumTargetPrice");
    return value!.toBigDecimal();
  }

  set minimumTargetPrice(value: BigDecimal) {
    this.set("minimumTargetPrice", Value.fromBigDecimal(value));
  }
}

export class Beat extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save Beat entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Beat must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Beat", id.toString(), this);
    }
  }

  static load(id: string): Beat | null {
    return changetype<Beat | null>(store.get("Beat", id));
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class BeatRewardIssued extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save BeatRewardIssued entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BeatRewardIssued must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BeatRewardIssued", id.toString(), this);
    }
  }

  static load(id: string): BeatRewardIssued | null {
    return changetype<BeatRewardIssued | null>(
      store.get("BeatRewardIssued", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get to(): Bytes {
    const value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get rewardToken(): Bytes {
    const value = this.get("rewardToken");
    return value!.toBytes();
  }

  set rewardToken(value: Bytes) {
    this.set("rewardToken", Value.fromBytes(value));
  }

  get rewardAmount(): BigDecimal {
    const value = this.get("rewardAmount");
    return value!.toBigDecimal();
  }

  set rewardAmount(value: BigDecimal) {
    this.set("rewardAmount", Value.fromBigDecimal(value));
  }
}

export class BeatRewardUpdated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    const id = this.get("id");
    assert(id != null, "Cannot save BeatRewardUpdated entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BeatRewardUpdated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BeatRewardUpdated", id.toString(), this);
    }
  }

  static load(id: string): BeatRewardUpdated | null {
    return changetype<BeatRewardUpdated | null>(
      store.get("BeatRewardUpdated", id)
    );
  }

  get id(): string {
    const value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockchain(): string {
    const value = this.get("blockchain");
    return value!.toString();
  }

  set blockchain(value: string) {
    this.set("blockchain", Value.fromString(value));
  }

  get block(): BigInt {
    const value = this.get("block");
    return value!.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    const value = this.get("transaction");
    return value!.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }

  get date(): string {
    const value = this.get("date");
    return value!.toString();
  }

  set date(value: string) {
    this.set("date", Value.fromString(value));
  }

  get timestamp(): BigInt {
    const value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get token(): Bytes {
    const value = this.get("token");
    return value!.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get rewardToken(): Bytes {
    const value = this.get("rewardToken");
    return value!.toBytes();
  }

  set rewardToken(value: Bytes) {
    this.set("rewardToken", Value.fromBytes(value));
  }

  get rewardAmount(): BigDecimal {
    const value = this.get("rewardAmount");
    return value!.toBigDecimal();
  }

  set rewardAmount(value: BigDecimal) {
    this.set("rewardAmount", Value.fromBigDecimal(value));
  }
}
