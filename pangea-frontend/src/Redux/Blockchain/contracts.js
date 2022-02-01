import Web3 from "web3";
import WalletLink from "walletlink";
import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { MEWethereum } from "./mewConfig";

// svgs
import CC_LOGO from "../../Assets/CC_Logo.svg";

import { marketPlaceAbiE, marketPlaceAddressE } from "./Ethereum/marketPlace";
import { createNFTAbiE, createNFTAddressE } from "./Ethereum/createNFT";
import { auctionAbiE, auctionAddressE } from "./Ethereum/auction";
import { openToBidsABIE, openToBidsAddressE } from "./Ethereum/openToBids";
import { marketPlaceAbiB, marketPlaceAddressB } from "./Binance/marketPlace";
import { createNFTAbiB, createNFTAddressB } from "./Binance/createNFT";
import { auctionAbiB, auctionAddressB } from "./Binance/auction";
import { openToBidsABIB, openToBidsAddressB } from "./Binance/openToBids";
import { marketPlaceAbiP, marketPlaceAddressP } from "./Polygon/marketPlace";
import { createNFTAbiP, createNFTAddressP } from "./Polygon/createNFT";
import { auctionAbiP, auctionAddressP } from "./Polygon/auction";
import { openToBidsABIP, openToBidsAddressP } from "./Polygon/openToBids";

const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/7834b610dbc84b509297a8789ca345e0",
  4: "https://rinkeby.infura.io/v3/7834b610dbc84b509297a8789ca345e0",
  137: "https://polygon-mainnet.infura.io/v3/7834b610dbc84b509297a8789ca345e0",
  80001:
    "https://speedy-nodes-nyc.moralis.io/7ce69af8c67a5c54f3533468/polygon/mumbai",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  56: "https://bsc-dataseed.binance.org/",
};

// coinbase
export const walletLink = new WalletLink({
  appName: "thepangea",
  appLogoUrl: CC_LOGO,
  darkMode: false,
});

export const ethereumCoinbase = walletLink.makeWeb3Provider(
  RPC_URLS[80001],
  80001
);

const POLLING_INTERVAL = 12000;

// walletconnect
export const walletConnectorProvider = new WalletConnectProvider({
  rpc: { 80001: RPC_URLS[80001] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

// ######################333

export let metaMaskProvider;
// export let walletConnectorProvider

const getMetamaskProvider = async () => {
  try {
    metaMaskProvider = await detectEthereumProvider();
  } catch (error) {
    console.log(error?.message);
  }
};
getMetamaskProvider();

const getContracts = (walletType, networkID) => {
  let web3 = new Web3(RPC_URLS[56]);

  switch (walletType) {
    case "MetaMask":
      if (metaMaskProvider) {
        web3 = new Web3(metaMaskProvider);
      }
      break;
    case "Coinbase":
      web3 = new Web3(ethereumCoinbase);
      break;
    case "WalletConnector":
      web3 = new Web3(walletConnectorProvider);
      break;
    case "MEW":
      web3 = new Web3(MEWethereum);
      break;
    default:
      web3 = new Web3(RPC_URLS[4]);
      break;
  }

  let marketPlace,
    createNFT,
    auction,
    openToBids,
    marketAddress,
    createAddress,
    auctionAddress,
    openToBidsAddress;

  switch (networkID) {
    case "4":
      marketAddress = marketPlaceAddressE;
      createAddress = createNFTAddressE;
      auctionAddress = auctionAddressE;
      openToBidsAddress = openToBidsAddressE;
      marketPlace = new web3.eth.Contract(marketPlaceAbiE, marketPlaceAddressE);
      createNFT = new web3.eth.Contract(createNFTAbiE, createNFTAddressE);
      auction = new web3.eth.Contract(auctionAbiE, auctionAddressE);
      openToBids = new web3.eth.Contract(openToBidsABIE, openToBidsAddressE);
      break;
    case "97":
      marketAddress = marketPlaceAddressB;
      createAddress = createNFTAddressB;
      auctionAddress = auctionAddressB;
      openToBidsAddress = openToBidsAddressB;
      marketPlace = new web3.eth.Contract(marketPlaceAbiB, marketPlaceAddressB);
      createNFT = new web3.eth.Contract(createNFTAbiB, createNFTAddressB);
      auction = new web3.eth.Contract(auctionAbiB, auctionAddressB);
      openToBids = new web3.eth.Contract(openToBidsABIB, openToBidsAddressB);
      break;
    case "80001":
      marketAddress = marketPlaceAddressP;
      marketAddress = marketPlaceAddressP;
      createAddress = createNFTAddressP;
      openToBidsAddress = openToBidsAddressP;
      marketPlace = new web3.eth.Contract(marketPlaceAbiP, marketPlaceAddressP);
      createNFT = new web3.eth.Contract(createNFTAbiP, createNFTAddressP);
      auction = new web3.eth.Contract(auctionAbiP, auctionAddressP);
      openToBids = new web3.eth.Contract(openToBidsABIP, openToBidsAddressP);
      break;

    default:
      marketAddress = marketPlaceAddressE;
      createAddress = createNFTAddressE;
      auctionAddress = auctionAddressE;
      openToBidsAddress = openToBidsAddressE;
      marketPlace = new web3.eth.Contract(marketPlaceAbiE, marketPlaceAddressE);
      createNFT = new web3.eth.Contract(createNFTAbiE, createNFTAddressE);
      auction = new web3.eth.Contract(auctionAbiE, auctionAddressE);
      openToBids = new web3.eth.Contract(openToBidsABIE, openToBidsAddressE);
      break;
  }

  return {
    web3,
    marketPlace,
    createNFT,
    auction,
    openToBids,
    marketAddress,
    createAddress,
    auctionAddress,
    openToBidsAddress,
  };
};

export default getContracts;
