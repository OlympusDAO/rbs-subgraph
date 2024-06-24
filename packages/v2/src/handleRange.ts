import { Address, ethereum } from "@graphprotocol/graph-ts";
import { createRangeV2Snapshot } from "./rangeV2Snapshot";
import { ERC20_OHM_V2 } from "./constants";

export function handleBlock(block: ethereum.Block): void {
    createRangeV2Snapshot(Address.fromString(ERC20_OHM_V2), block);
}
