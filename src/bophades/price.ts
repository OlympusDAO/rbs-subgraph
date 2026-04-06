import { ethereum, Address } from "@graphprotocol/graph-ts";
import { Price } from "../../generated/PriceV1/Price";
import { getModuleAddress } from "./kernel";

/**
 * Returns the currently-active PRICE contract.
 * 
 * @param block 
 * @returns 
 */
export function getPriceContract(block: ethereum.Block): Price {
  const address: Address = getModuleAddress("PRICE");
  if (address.equals(Address.zero())) {
      throw new Error(`Unable to determine current price contract address at block ${block.number.toString()}`);
  }

  return Price.bind(address);
}
