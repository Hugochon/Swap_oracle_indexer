# Chainlink Swap & DeFi Dashboard

## Overview
This project is a foundational foray into building decentralized finance (DeFi) tools using Ethereum smart contracts. It includes two primary components: a token swap system utilizing Chainlink's price feeds and a small DeFi dashboard powered by TheGraph.

### Objectives
- Implement a swap mechanism using Chainlink for price accuracy.
- Establish a marketplace for exchanging two types of tokens.
- Develop a DeFi dashboard to display significant data about sushiswap LP Tokens.

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

## Contributing
Contributions are welcome to improve the swap functionality or the DeFi dashboard. Please ensure to submit issues and pull requests for any enhancements.

