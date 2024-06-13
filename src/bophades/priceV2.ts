import { Address,ethereum } from "@graphprotocol/graph-ts";

import { PriceV2 } from "../../generated/PriceV2/PriceV2";
import { getModuleAddress } from "./kernel";

/**
 * Returns the currently-active PRICE contract.
 *
 * @param block
 * @returns
 */
export function getPriceV2Contract(block: ethereum.Block): PriceV2 {
  const address: Address = getModuleAddress("PRICE");
  if (address.equals(Address.zero())) {
      throw new Error(`Unable to determine current price contract address at block ${block.number.toString()}`);
  }

  const contract = PriceV2.bind(address);
  if (contract.VERSION().getMajor() != 2) {
    throw new Error(`PRICE contract at address ${address.toHexString()} is not a V2 contract`);
  }

  return contract;
}
