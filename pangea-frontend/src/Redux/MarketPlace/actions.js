import {
  GET_ALL_NFTS_FAIL,
  GET_ALL_NFTS_SUCCESS,
  GET_ALL_NFTS_REQUEST,
} from '../constants'
import getContracts from '../Blockchain/contracts'
import {gasPrice, priceConversion} from '../../Utilities/Util'

// const price = priceConversion('toWei', 'ether', amount, web3)
// const newGasPrice = await gasPrice(web3)

export const getAllNFTS = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_NFTS_REQUEST,
    })
    const {
      profile: {walletType, networkID},
    } = getState()
    const {web3, marketPlace} = getContracts(walletType, networkID)
    const transaction = await marketPlace.methods.createSale().call()
    dispatch({
      type: GET_ALL_NFTS_SUCCESS,
      payload: transaction,
    })
  } catch (error) {
    dispatch({
      type: GET_ALL_NFTS_FAIL,
      payload: error?.message,
    })
  }
}
