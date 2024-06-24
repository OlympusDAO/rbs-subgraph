import { Address, ethereum } from "@graphprotocol/graph-ts";

import { ERC20_OHM_V2 } from "./constants";
import { createRangeV2Snapshot } from "./rangeV2Snapshot";

export function handleBlock(block: ethereum.Block): void {
    // TODO handle if range snapshot exists
    createRangeV2Snapshot(Address.fromString(ERC20_OHM_V2), block);
}
