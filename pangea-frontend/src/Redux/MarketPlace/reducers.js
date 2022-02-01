import {
  GET_ALL_NFTS_FAIL,
  GET_ALL_NFTS_SUCCESS,
  GET_ALL_NFTS_REQUEST,
} from '../constants'

const initialState = {
  marketLoading: false,
  marketError: false,
  marketNFTS: [],
}

export const marketPlaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NFTS_REQUEST:
      return {
        ...state,
        marketLoading: true,
        marketError: false,
      }
    case GET_ALL_NFTS_SUCCESS:
      return {
        ...state,
        marketNFTS: action.payload,
      }

    case GET_ALL_NFTS_FAIL:
      return {
        ...state,
        marketLoading: false,
        marketError: action.payload,
      }

    default:
      return state
  }
}
