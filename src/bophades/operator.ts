import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { Operator } from "../../generated/PriceV1/Operator";
import { OPERATOR_CONTRACT_V1, OPERATOR_CONTRACT_V1_1_BLOCK, OPERATOR_CONTRACT_V1_1, OPERATOR_CONTRACT_V1_3_BLOCK, OPERATOR_CONTRACT_V1_3 } from "../constants";

/**
 * Returns the currently-active Operator policy contract.
 * 
 * This uses hard-coded addresses and starting blocks, as there is no
 * function for determining the current Operator contract address.
 * 
 * @param block 
 * @returns 
 */
export function getOperatorContract(block: ethereum.Block): Operator {
  let address: string = OPERATOR_CONTRACT_V1;

  if (block.number.ge(BigInt.fromString(OPERATOR_CONTRACT_V1_1_BLOCK))) {
      address = OPERATOR_CONTRACT_V1_1;
  }

  if (block.number.ge(BigInt.fromString(OPERATOR_CONTRACT_V1_3_BLOCK))) {
      address = OPERATOR_CONTRACT_V1_3;
  }

  return Operator.bind(Address.fromString(address));
}
