import { Address, ethereum } from "@graphprotocol/graph-ts";
import { Range } from "../../generated/Range/Range";
import { getModuleAddress } from "./kernel";
import { Range_v2 } from "../../generated/Range_v2/Range_v2";

/**
 * Returns the currently-active RANGE contract.
 * 
 * @param block 
 * @returns 
 */
export function getRangeContract(block: ethereum.Block): Range {
  const address: Address = getModuleAddress("RANGE");
  if (address.equals(Address.zero())) {
      throw new Error(`Unable to determine current range contract address at block ${block.number.toString()}`);
  }

  return Range.bind(address);  
}

export function getRangeV2Contract(block: ethereum.Block): Range_v2 {
  const address: Address = getModuleAddress("RANGE");
  if (address.equals(Address.zero())) {
      throw new Error(`Unable to determine current range contract address at block ${block.number.toString()}`);
  }

  return Range_v2.bind(address);
}
