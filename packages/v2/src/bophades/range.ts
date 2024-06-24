import { Address, ethereum } from "@graphprotocol/graph-ts";

import { Range_v2 } from "../../generated/Range_v2/Range_v2";
import { getModuleAddress } from "./kernel";

export function getRangeV2Contract(block: ethereum.Block): Range_v2 {
  const address: Address = getModuleAddress("RANGE");
  if (address.equals(Address.zero())) {
      throw new Error(`Unable to determine current range contract address at block ${block.number.toString()}`);
  }

  const contract = Range_v2.bind(address);
  if (contract.VERSION().getMajor() != 2) {
      throw new Error(`RANGE contract at address ${address.toHexString()} is not a V2 contract`);
  }

  return contract;
}
