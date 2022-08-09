import * as fs from "fs";
import { ethers } from "ethers";
import "dotenv/config";

const run = async () => {

    const tokenIds = []
    const minters = []
    const abi = JSON.parse(fs.readFileSync("src/erc721.json"));

    const contractCreationBlock = 24155383; // I looked this up on PolyScan - it is the block number that the contract was deployed. Having this just making filtering quicker.
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const alchemyProviderURL = `wss://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`

    const wsProvider = new ethers.providers.WebSocketProvider(alchemyProviderURL)

    const nftContract = new ethers.Contract(contractAddress, abi.abi, wsProvider)

    const filterQuery = await nftContract.queryFilter(nftContract.filters.Transfer(), contractCreationBlock)

    filterQuery.forEach(async tx => {
        // console.log(tx)
        if(
            tx.args[0] === ethers.constants.AddressZero &&
            (
                tx.args[2].toString()[0] === "1" ||
                tx.args[2].toString()[0] === "2"
            )
            ) {
                tokenIds.push(tx.args[2].toNumber());
                minters.push(tx.args[1]);
        }
    })

    console.log(tokenIds);
    console.log(minters);

    wsProvider.websocket.close()
}

run().catch((error) => {
    console.error(error)
    process.exitCode = 1
})