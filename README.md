# Filter Event Example

This contains a script that allows you to get all the addresses that minted an NFT from a specific NFT smart contract, using filtering methods from ethers.js.

## Repo set up

Clone the repo and run `npm i` to install necessary dependencies.

Create a .env similar to the existing .env.example file. Place your own Alchemy API and the address of you NFT smart contract.

To run the script, type the command `npm run getMinters` in a terminal in this project's root folder.
The output will console log in the terminal an array of token Ids and an array of addresses that minted those tokenIds.

* Note that in the script getMinters.js, I hardcoded the block number of the smart contract I was testing with just to increase the script's return time.