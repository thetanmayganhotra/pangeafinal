import {
  CONNECT_WALLET,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  GET_TYPE_OF_NFT,
  GET_COUNTDOWN,
  GET_NETWORK_ID,
  GET_ASSET_DATA,
} from "../constants";
import getContracts, {
  ethereumCoinbase,
  walletLink,
  metaMaskProvider,
  walletConnectorProvider,
} from "../Blockchain/contracts";
import { MEWethereum } from "../Blockchain/mewConfig";
import Web3 from "web3";

export const getNftType = (id) => async (dispatch) => {
  dispatch({
    type: GET_TYPE_OF_NFT,
    payload: id,
  });
};
export const getNftCountdown = (id) => async (dispatch, getState) => {
  try {
    const {
      profile: { walletType, networkID },
    } = getState();
    const { web3, auction } = getContracts(walletType, networkID);
    const transaction = await auction.methods
      .timeLeftForAuctionToEnd(id)
      .call();
    return transaction;
  } catch (error) {
    console.log(error.message);
  }
};

export const getNetwork = (id) => async (dispatch, getState) => {
  localStorage.setItem("networkID", id);
  dispatch({
    type: GET_NETWORK_ID,
    payload: id,
  });
};
export const setNetwork = () => async (dispatch, getState) => {
  const get = localStorage.getItem("networkID");

  if (get) {
    dispatch({
      type: GET_NETWORK_ID,
      payload: get,
    });
  } else {
    localStorage.setItem("networkID", "56");
  }
};

export const setAssetData = (data) => async (dispatch, getState) => {
  dispatch({
    type: GET_ASSET_DATA,
    payload: data,
  });
};

// const data = [
//   {
//     chainId: "0x38",
//     chainName: "Binance Smart Chain Testnet",
//     nativeCurrency: {
//       name: "BNB",
//       symbol: "BNB",
//       decimals: 18,
//     },
//     rpcUrls: ["https://bsc-dataseed.binance.org/"],
//     blockExplorerUrls: ["https://bscscan.com/"],
//   },
// ];
const bnb = [
  {
    chainId: "0x61",
    chainName: "Smart Chain - Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
];

const ethereum = [
  {
    chainId: "0x4",
    chainName: "Rinkeby",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [
      "https://rinkeby.infura.io/ws/v3/9598959dac984109a2bf08134b38afc6",
    ],
    blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
  },
];

const polygon = [
  {
    chainId: "0x13881",
    chainName: "Mumbai TestNet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
];

// actions

export const AddNetworks = (network) => async (dispatch) => {
  try {
    await metaMaskProvider.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId:
            network === "ethereum"
              ? ethereum[0]?.chainId
              : network === "bnb"
              ? bnb[0]?.chainId
              : network === "polygon"
              ? polygon[0]?.chainId
              : null,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    if (error?.code === 4902) {
      try {
        await metaMaskProvider.request({
          method: "wallet_addEthereumChain",
          params:
            network === "ethereum"
              ? ethereum
              : network === "bnb"
              ? bnb
              : network === "polygon"
              ? polygon
              : null,
        });
      } catch (addError) {
        console.error(addError?.message);
      }
    }
  }
};

export const checkAndAddNetwork = (data) => async (dispatch) => {
  try {
    await metaMaskProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: data[0]?.chainId }],
    });
  } catch (error) {
    console.log(error);
    if (error?.code === 4902) {
      try {
        await metaMaskProvider.request({
          method: "wallet_addEthereumChain",
          params: data,
        });
      } catch (addError) {
        console.error(addError?.message);
      }
    }
  }
};

export const connToMetaMask = () => async (dispatch, getState) => {
  try {
    const get = localStorage.getItem("networkID");
    const web3 = new Web3(Web3.givenProvider);
    const id = web3.eth.net.getId();
    const networkId = await Promise.all([id]);
    if (get) {
      dispatch(
        checkAndAddNetwork(
          Number(get) == 1 ? ethereum : Number(get) == 56 ? bnb : polygon
        )
      );
    } else if (Number(get) !== networkId[0]) {
      dispatch(checkAndAddNetwork(bnb));
    }
    const accounts = await metaMaskProvider.request({
      method: "eth_requestAccounts",
    });
    dispatch({
      type: CONNECT_WALLET,
      payload: accounts?.[0],
      walletType: "MetaMask",
    });
  } catch (error) {
    console.error(error?.message);
  }
};

export const connToCoinbase = () => async (dispatch) => {
  try {
    // dispatch(checkAndAddNetwork())
    const accounts = await ethereumCoinbase.enable();
    // coinbaseWeb3.eth.defaultAccount = accounts[0]
    dispatch({
      type: CONNECT_WALLET,
      payload: accounts[0],
      walletType: "Coinbase",
    });
  } catch (error) {
    console.error(error?.message);
  }
};

export const connToWalletConnector = () => async (dispatch, getState) => {
  try {
    const accounts = await walletConnectorProvider.enable();
    dispatch({
      type: CONNECT_WALLET,
      payload: accounts[0],
      walletType: "WalletConnector",
    });
  } catch (error) {
    console.error(error?.message);
  }
};

export const connToMEW = () => async (dispatch) => {
  try {
    const accounts = await MEWethereum.request({
      method: "eth_requestAccounts",
    });

    // const acc = await web3.eth.getAccounts()

    // const accounts = await ethereumCoinbase.enable()
    // const accounts = await web3.eth.getAccounts();
    // const accounts = await metaMaskProvider.request({
    //   method: 'eth_requestAccounts',
    // })
    dispatch({
      type: CONNECT_WALLET,
      payload: accounts[0],
      walletType: "MEW",
    });
  } catch (error) {
    console.error(error?.message);
  }
};

export const disConnectWallet = () => async () => {
  // web3.currentProvider._handleDisconnect()
  await walletConnectorProvider.disconnect();
  walletLink.disconnect();
};
export const getProfileInformation = () => async (dispatch, getState) => {
  try {
    const {
      profile: { userAddress, walletType },
    } = getState();
    dispatch({
      type: PROFILE_REQUEST,
    });
    // const {web3} = getContracts(walletType)
    dispatch({
      type: PROFILE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
      payload: error?.message,
    });
  }
};
