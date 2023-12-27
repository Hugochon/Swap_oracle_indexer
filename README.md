# Chainlink Swap & DeFi Dashboard

## Overview
This project is a foundational foray into building decentralized finance (DeFi) tools using Ethereum smart contracts. It includes two primary components: a token swap system utilizing Chainlink's price feeds and a small DeFi dashboard powered by TheGraph.

### Objectives
- Implement a swap mechanism using Chainlink for price accuracy.
- Establish a marketplace for exchanging two types of tokens.
- Develop a DeFi dashboard to display significant data about sushiswap LP Tokens.

### Links :

- [Website](https://swap-oracle-indexer.vercel.app/) deployed on Vercel.
- USDH token [contract](https://sepolia.etherscan.io/token/0x6A4A9140b11f34787179164b64Fc4AD454867034)
- ETH-like token [contract](https://sepolia.etherscan.io/address/0xa7D34595Bad0753F3970B642e559D69D0e75bE7F#readContract)
- Marketplace [contract](https://sepolia.etherscan.io/address/0x40F156bCAbb6E3903A31344cA97eb8E9558A9e51#readContract)

## Components

### Part 1: Swap with Chainlink
- **Setup**: Initialize a repository with Foundry for smart contract development and testing.
- **Token Creation**: 
  - *Stablecoin*: Represent a stable currency in the ecosystem.
  - *Asset Token*: This token's value is derived from Chainlink's price feeds.
- **Marketplace**: A platform for exchanging tokens at prices determined by Chainlink.
- **Token Balances**: Ensure contracts have sufficient balances for operation.
- **Chainlink Integration**: Utilize Chainlink's price feeds for real-time price data.

Relevant Links:
- [Chainlink Data Feeds](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum&page=1)

### Part 2: DeFi Dashboard with TheGraph
- **Goal**: Create a DeFi dashboard using TheGraph to index and query blockchain data.
- **Script**: A script capable of taking a SushiSwap LP Token address and displaying relevant data.
- **Whales Tracking**: Identify and display the three largest holders of a given LP Token.
- **Token Insights**: Show balance and underlying tokens of the LP Tokens.

Relevant Links:
- [TheGraph Documentation](https://thegraph.com/docs/en/)
- [TheGraph Playground](https://api.thegraph.com/subgraphs/name/sushiswap/exchange/graphql?query=%7B%0A++pairs%28first%3A+10%2C+orderBy%3A+reserveUSD%2C+orderDirection%3A+desc%29+%7B%0A++++id%0A++++token0+%7B%0A++++++id%0A++++++symbol%0A++++++name%0A++++%7D%0A++++token1+%7B%0A++++++id%0A++++++symbol%0A++++++name%0A++++%7D%0A++++reserveUSD%0A++%7D%0A%7D%0A#)

-----------------

By Schneegans Hugo and Teyssedre Jean.

