import { Address,ethereum } from "@graphprotocol/graph-ts";

import { Price_v2 } from "../../generated/Price_v2/Price_v2"
import { getModuleAddress } from "./kernel";

/**
 * Returns the currently-active PRICE contract.
 *
 * @param block
 * @returns
 */
export function getPriceV2Contract(block: ethereum.Block): Price_v2 {
  const address: Address = getModuleAddress("PRICE");
  if (address.equals(Address.zero())) {
      throw new Error(`Unable to determine current price contract address at block ${block.number.toString()}`);
  }

  const contract = Price_v2.bind(address);
  if (contract.VERSION().getMajor() != 2) {
    throw new Error(`PRICE contract at address ${address.toHexString()} is not a V2 contract`);
  }

  return contract;
}
