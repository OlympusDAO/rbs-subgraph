# Range-Bound Stability Subgraph

## Purpose

This repository contains code to deploy a subgraph that indexes events related to OlympusDAO's Range-Bound Stability.

## Contracts

This subgraph indexes events from the following contracts:

- Range
- Price

Where relevant, additional data/context from the contract is included in the indexed data.

It currently indexes the contracts on the Goerli testnet. However, it will be shifted to Ethereum mainnet upon final deployment.

## Subgraph

It is published at: <https://thegraph.com/explorer/subgraphs/8L8ZJ5hqCZguKk2QyBRWWdsp2thmzHF2Egyj4TqC9NHc?view=Overview&chain=arbitrum-one>

## RBS Updates

When a new RBS version is launched, the following steps must be taken to update the subgraph:

- Define a new data source in `subgraph.yaml` for any of the affected triggers.
  - Generally, this will just be a new version of the `Heart` policy. Add the new contract address and set the `startBlock` to be the deployment block.
  - If any of the other triggers (`RANGE`, `PRICE` at the time of writing) have had new versions deployed, add new data sources for them too.
- If the ABI/interfaces for any dependencies has changed, add the new ABI (with a version indicator), and ensure that the relevant data sources use that ABI.
- If the `Operator` policy has changed, update the `getOperatorContract` function to return the new `Operator` contract address at the _activation_ (not deployment) block.
- Bophades modules that are used (`RANGE`, `PRICE`, `TRSRY`) for data lookup are accessed using the Bophades kernel, so do not need the addresses or starting blocks.
- Adjust the base contract and starting block for grafting, as re-indexing can take a long time.
- Bump the version number in `.subgraph-version`.
- Deploy to Subgraph Studio using `yarn deploy:studio`.
- Let the new version re-index and confirm that it indexes events from the new version.
- Publish to the Decentralized Network using the Subgraph Studio interface.
