import {
  CONNECT_WALLET,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  GET_TYPE_OF_NFT,
  GET_NETWORK_ID,
  GET_ASSET_DATA,
} from '../constants'

const initialState = {
  profileLoading: false,
  profileError: false,
  userAddress: '',
  walletType: 'MetaMask',
  availableBalance: 0,
  nftCardType: null,
  networkID: '4',
  assetInfo: {},
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSET_DATA:
      return {
        ...state,
        assetInfo: action.payload,
      }
    case GET_TYPE_OF_NFT:
      return {
        ...state,
        nftCardType: action.payload,
      }
    case GET_NETWORK_ID:
      return {
        ...state,
        networkID: action.payload,
      }
    case CONNECT_WALLET:
      return {
        ...state,
        userAddress: action.payload,
        walletType: action.walletType,
      }
    case PROFILE_REQUEST:
      return {
        ...state,
        profileLoading: true,
        profileError: false,
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
      }
    case PROFILE_FAIL:
      return {
        ...state,
        profileLoading: false,
        profileError: action.payload,
      }

    default:
      return state
  }
}
