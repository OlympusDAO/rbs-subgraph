import { Address, ethereum } from "@graphprotocol/graph-ts";

import { Treasury } from "../../generated/Range_v2/Treasury";
import { getModuleAddress } from "./kernel";

/**
 * Returns the currently-active TRSRY contract.
 *
 * @param block
 * @returns
 */
export function getTreasuryContract(block: ethereum.Block): Treasury {
  const address: Address = getModuleAddress("TRSRY");
  if (address.equals(Address.zero())) {
      throw new Error(`Unable to determine current treasury contract address at block ${block.number.toString()}`);
  }

  return Treasury.bind(address);
}
