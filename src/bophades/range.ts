import { Address, ethereum } from "@graphprotocol/graph-ts";
import { Range } from "../../generated/PriceV1/Range";
import { getModuleAddress } from "./kernel";

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
