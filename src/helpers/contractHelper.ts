import { Address } from "@graphprotocol/graph-ts";

import { PRICE_CONTRACT, RANGE_CONTRACT } from "../constants";

export const CHAIN_GOERLI = "Goerli";
export const CHAIN_MAINNET = "Mainnet";

const ADDRESS_CHAIN_MAPPING = new Map<string, string>();
ADDRESS_CHAIN_MAPPING.set(PRICE_CONTRACT.toLowerCase(), CHAIN_MAINNET);
ADDRESS_CHAIN_MAPPING.set(RANGE_CONTRACT.toLowerCase(), CHAIN_MAINNET);

/**
 * Returns the chain for the given contract address.
 * 
 * The Graph Protocol does not give a subgraph access to details
 * about the chain it is operating on, so this approach has to be used.
 * 
 * @returns the chain name, or "Unknown" 
 */
export function getChain(address: Address): string {
    const addressLower = address.toHexString().toLowerCase();
    if (!ADDRESS_CHAIN_MAPPING.has(addressLower)) {
        return "Unknown";
    }

    return ADDRESS_CHAIN_MAPPING.get(addressLower);
}
