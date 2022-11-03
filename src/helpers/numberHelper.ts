
import { BigInt } from "@graphprotocol/graph-ts"

export function getUnixTimestamp(timestamp: BigInt): BigInt {
    return timestamp.times(BigInt.fromString("1000"));
}