import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  CushionDown,
  CushionUp,
  PricesChanged,
  SpreadsChanged,
  ThresholdFactorChanged,
  WallDown,
  WallUp
} from "../generated/Range/Range"

export function createCushionDownEvent(
  high_: boolean,
  timestamp_: BigInt
): CushionDown {
  let cushionDownEvent = changetype<CushionDown>(newMockEvent())

  cushionDownEvent.parameters = new Array()

  cushionDownEvent.parameters.push(
    new ethereum.EventParam("high_", ethereum.Value.fromBoolean(high_))
  )
  cushionDownEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp_",
      ethereum.Value.fromUnsignedBigInt(timestamp_)
    )
  )

  return cushionDownEvent
}

export function createCushionUpEvent(
  high_: boolean,
  timestamp_: BigInt,
  capacity_: BigInt
): CushionUp {
  let cushionUpEvent = changetype<CushionUp>(newMockEvent())

  cushionUpEvent.parameters = new Array()

  cushionUpEvent.parameters.push(
    new ethereum.EventParam("high_", ethereum.Value.fromBoolean(high_))
  )
  cushionUpEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp_",
      ethereum.Value.fromUnsignedBigInt(timestamp_)
    )
  )
  cushionUpEvent.parameters.push(
    new ethereum.EventParam(
      "capacity_",
      ethereum.Value.fromUnsignedBigInt(capacity_)
    )
  )

  return cushionUpEvent
}

export function createPricesChangedEvent(
  wallLowPrice_: BigInt,
  cushionLowPrice_: BigInt,
  cushionHighPrice_: BigInt,
  wallHighPrice_: BigInt
): PricesChanged {
  let pricesChangedEvent = changetype<PricesChanged>(newMockEvent())

  pricesChangedEvent.parameters = new Array()

  pricesChangedEvent.parameters.push(
    new ethereum.EventParam(
      "wallLowPrice_",
      ethereum.Value.fromUnsignedBigInt(wallLowPrice_)
    )
  )
  pricesChangedEvent.parameters.push(
    new ethereum.EventParam(
      "cushionLowPrice_",
      ethereum.Value.fromUnsignedBigInt(cushionLowPrice_)
    )
  )
  pricesChangedEvent.parameters.push(
    new ethereum.EventParam(
      "cushionHighPrice_",
      ethereum.Value.fromUnsignedBigInt(cushionHighPrice_)
    )
  )
  pricesChangedEvent.parameters.push(
    new ethereum.EventParam(
      "wallHighPrice_",
      ethereum.Value.fromUnsignedBigInt(wallHighPrice_)
    )
  )

  return pricesChangedEvent
}

export function createSpreadsChangedEvent(
  cushionSpread_: BigInt,
  wallSpread_: BigInt
): SpreadsChanged {
  let spreadsChangedEvent = changetype<SpreadsChanged>(newMockEvent())

  spreadsChangedEvent.parameters = new Array()

  spreadsChangedEvent.parameters.push(
    new ethereum.EventParam(
      "cushionSpread_",
      ethereum.Value.fromUnsignedBigInt(cushionSpread_)
    )
  )
  spreadsChangedEvent.parameters.push(
    new ethereum.EventParam(
      "wallSpread_",
      ethereum.Value.fromUnsignedBigInt(wallSpread_)
    )
  )

  return spreadsChangedEvent
}

export function createThresholdFactorChangedEvent(
  thresholdFactor_: BigInt
): ThresholdFactorChanged {
  let thresholdFactorChangedEvent = changetype<ThresholdFactorChanged>(
    newMockEvent()
  )

  thresholdFactorChangedEvent.parameters = new Array()

  thresholdFactorChangedEvent.parameters.push(
    new ethereum.EventParam(
      "thresholdFactor_",
      ethereum.Value.fromUnsignedBigInt(thresholdFactor_)
    )
  )

  return thresholdFactorChangedEvent
}

export function createWallDownEvent(
  high_: boolean,
  timestamp_: BigInt,
  capacity_: BigInt
): WallDown {
  let wallDownEvent = changetype<WallDown>(newMockEvent())

  wallDownEvent.parameters = new Array()

  wallDownEvent.parameters.push(
    new ethereum.EventParam("high_", ethereum.Value.fromBoolean(high_))
  )
  wallDownEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp_",
      ethereum.Value.fromUnsignedBigInt(timestamp_)
    )
  )
  wallDownEvent.parameters.push(
    new ethereum.EventParam(
      "capacity_",
      ethereum.Value.fromUnsignedBigInt(capacity_)
    )
  )

  return wallDownEvent
}

export function createWallUpEvent(
  high_: boolean,
  timestamp_: BigInt,
  capacity_: BigInt
): WallUp {
  let wallUpEvent = changetype<WallUp>(newMockEvent())

  wallUpEvent.parameters = new Array()

  wallUpEvent.parameters.push(
    new ethereum.EventParam("high_", ethereum.Value.fromBoolean(high_))
  )
  wallUpEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp_",
      ethereum.Value.fromUnsignedBigInt(timestamp_)
    )
  )
  wallUpEvent.parameters.push(
    new ethereum.EventParam(
      "capacity_",
      ethereum.Value.fromUnsignedBigInt(capacity_)
    )
  )

  return wallUpEvent
}
