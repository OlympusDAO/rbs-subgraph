import { dataSource } from "@graphprotocol/graph-ts";

/**
 * Returns the chain the subgraph is operating on.
 * 
 * @returns the chain name
 */
export function getChain(): string {
    return dataSource.network();
}
