const Migrations = artifacts.require("Migrations");
const MintNft = artifacts.require("MintNft");
const NFTAuction = artifacts.require("NFTAuction");
const NFTMarket = artifacts.require("NFTMarket");
const OpenToBids = artifacts.require("OpenToBids");
module.exports = async function (deployer) {
  deployer.deploy(Migrations);
  await deployer.deploy(MintNft, "Pangea", "PNG");
  const mintNFTContract = await MintNft.deployed();
  await deployer.deploy(
    NFTAuction,
    mintNFTContract.address,
    "0x7c04ff74d14798f04cd329d3A779e22C42FD9A7C"
  );
  await deployer.deploy(
    NFTMarket,
    mintNFTContract.address,
    "0x7c04ff74d14798f04cd329d3A779e22C42FD9A7C"
  );
  await deployer.deploy(
    OpenToBids,
    mintNFTContract.address,
    "0x7c04ff74d14798f04cd329d3A779e22C42FD9A7C"
  );
};
