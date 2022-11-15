import { Address } from "@graphprotocol/graph-ts";

export const CHAIN_GOERLI = "Goerli";
export const CHAIN_MAINNET = "Mainnet";

const ADDRESS_CHAIN_MAPPING = new Map<string, string>();
ADDRESS_CHAIN_MAPPING.set("0x9ecda630626a3aa9ef24a53c4faca1ce76a1a508".toLowerCase(), CHAIN_GOERLI);
ADDRESS_CHAIN_MAPPING.set("0x6d39cdfa180974c5e1ac6fd325a1718f2fd4412f".toLowerCase(), CHAIN_GOERLI);
// TODO Add mainnet addresses

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
