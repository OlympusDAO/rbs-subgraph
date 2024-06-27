import { BigInt, log } from "@graphprotocol/graph-ts";

import { AssetObservation as AssetObservationEvent, MetricObservation as MetricObservationEvent } from "../generated/Appraiser/Appraiser";
import { AssetObservation, MetricObservation } from "../generated/schema";
import { getMetricName } from "./bophades/appraiser";
import { getChain } from "./helpers/contractHelper";
import { getISO8601StringFromTimestamp } from "./helpers/dateHelper";
import { toDecimal } from "./helpers/decimalHelper";
import { getUnixTimestamp } from "./helpers/numberHelper";
import { getOrCreateToken } from "./helpers/token";

export function handleAssetObservation(event: AssetObservationEvent): void {
    log.debug("New asset observation at block {} for asset {}", [event.block.number.toString(), event.params.asset.toHexString()]);
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const record = new AssetObservation(event.transaction.hash.concatI32(event.logIndex.toI32()));

    record.blockchain = getChain();
    record.block = event.block.number;
    record.transaction = event.transaction.hash;
    record.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    record.timestamp = unixTimestamp;

    record.asset = event.params.asset;

    const token = getOrCreateToken(event.params.asset);
    record.price = toDecimal(event.params.value, token.decimals);

    record.save();
}

export function handleMetricObservation(event: MetricObservationEvent): void {
    const metricName = getMetricName(event.params.metric);

    log.debug("New metric observation at block {} for metric {}", [event.block.number.toString(), metricName]);
    const unixTimestamp: BigInt = getUnixTimestamp(event.block.timestamp);

    const record = new MetricObservation(event.transaction.hash.concatI32(event.logIndex.toI32()));

    record.blockchain = getChain();
    record.block = event.block.number;
    record.transaction = event.transaction.hash;
    record.date = getISO8601StringFromTimestamp(unixTimestamp.toI64());
    record.timestamp = unixTimestamp;

    record.metric = metricName;

    record.value = toDecimal(event.params.value, 18); // PRICE decimals

    record.save();
}
