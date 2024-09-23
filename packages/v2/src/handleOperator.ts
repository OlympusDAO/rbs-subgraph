import { BigInt, log } from "@graphprotocol/graph-ts";

import { ManualTargetPriceSet as ManualTargetPriceSetEvent } from "../generated/Operator_v2/Operator_v2";
import { ManualTargetPriceSet } from "../generated/schema";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";

export function handleManualTargetPriceSet(event: ManualTargetPriceSetEvent): void {
  log.debug("Manual target price set at block {}", [event.block.number.toString()]);
  const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

  const entity = new ManualTargetPriceSet(
    event.address.concat(event.transaction.hash).concatI32(event.logIndex.toI32())
  );
  entity.blockchain = getChain();
  entity.block = event.block.number;
  entity.transaction = event.transaction.hash;
  entity.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
  entity.timestamp = unixTimestamp;

  entity.targetPrice = toDecimal(event.params.targetPrice_, 18); // reserve (DAI) is 18 decimals

  entity.save();
}
