import { Address } from "@graphprotocol/graph-ts";

import { ERC20 } from "../../generated/Range_v2/ERC20";
import { Token } from "../../generated/schema";
import { getChain } from "./contractHelper";

export function getOrCreateToken(address: Address): Token {
  let token = Token.load(address);

  if (token === null) {
    token = new Token(address);
    token.blockchain = getChain();

    // Load the ERC20 contract
    const contract = ERC20.bind(address);

    token.name = contract.name();
    token.symbol = contract.symbol();
    token.decimals = contract.decimals();

    token.save();
  }

  return token as Token;
}
