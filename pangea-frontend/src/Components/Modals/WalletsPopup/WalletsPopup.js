import { useEffect, useState } from 'react'
import { Image, Modal } from 'react-bootstrap'
import {ReactComponent as CgClose}  from "../../../Assets/react-icons/CgClose.svg"
import MetaMaskNotFound from '../MetaMaskNotFound/MetaMaskNotFound'


// image
import MetaMaskFox from '../../../Assets/MetaMask.svg'
import Coinbase_wallet from '../../../Assets/coinbase_Wallet.svg'
import walletConnect_wallet from '../../../Assets/LandingPage/WalletConnectCircle.svg'
import mew_wallet from '../../../Assets/mew.svg'

// redux imports
import { useDispatch } from 'react-redux'
import {
  connToMetaMask,
  connToCoinbase,
  connToWalletConnector,
  connToMEW,
} from '../../../Redux/Profile/actions'

// providers
import { metaMaskProvider } from '../../../Redux/Blockchain/contracts'

const WalletsPopup = ({ show, handleClose }) => {
  const [meatMaskShow, setMeatMaskShow] = useState(false)
  const [provider, setProvider] = useState('')
  const dispatch = useDispatch()

  const connectToMetaMask = () => {
    if (metaMaskProvider) {
      dispatch(connToMetaMask())
    } else {
      openMetaMaskModal()
    }
  }

  //   Connecting to Coinbase
  const connectToCoinbase = () => {
    handleClose()
    dispatch(connToCoinbase())
  }
  //   Connecting to WalletConnector
  const connectToWalletConnector = () => {
    handleClose()
    dispatch(connToWalletConnector())
  }
  //   Connecting to MEW
  const connectToMEW = () => {
    handleClose()
    dispatch(connToMEW())
  }

  //  MetaMAsk notfound PopUP
  const closeMetaMaskModal = () => {
    setMeatMaskShow(false)
  }
  const openMetaMaskModal = () => {
    setMeatMaskShow(true)
    handleClose()
  }

  // USer Account Changed

  useEffect(() => {
    if (metaMaskProvider) {
      metaMaskProvider.on('accountsChanged', () => {
        dispatch(connToMetaMask())
      })
    }
  }, [metaMaskProvider])

  // USer Account Changed

  useEffect(() => {
    if (metaMaskProvider) {
      metaMaskProvider.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [metaMaskProvider])

  // useEffect(() => {
  //   const checkIt = async () => {
  //     if (typeof window.ethereum !== 'undefined') {
  //       // dispatch(connToMetaMask())
  //       const accounts = await web3.eth.getAccounts()
  //       if (accounts[0]) {
  //         dispatch(connToMetaMask())
  //       }
  //     }
  //   }
  //   checkIt()
  // }, [])

  return (
    <>
      <Modal
        className="buy__token__modal successModal wallets"
        show={show}
        onHide={handleClose}
      >
        <div className="buy__cpt__modal">
          <div className="buy__cpt__header">
            <div className="buy__cpt__header__tile">
              <h4>Connect To a Wallet</h4>
            </div>
            <div className="buy__cpt__header__close" onClick={handleClose}>
              <CgClose />
            </div>
          </div>
          <div className="success__body">
            <div className="wallet" onClick={connectToMetaMask}>
              <h5>MetaMask</h5>
              <Image src={MetaMaskFox} alt="" />
            </div>
            <div className="wallet" onClick={connectToCoinbase}>
              <h5>Coinbase</h5>
              <Image src={Coinbase_wallet} alt="" />
            </div>
            <div className="wallet" onClick={connectToWalletConnector}>
              <h5>Walletconnect</h5>
              <Image src={walletConnect_wallet} alt="" />
            </div>
            <div className="wallet" onClick={connectToMEW}>
              <h5>MEW</h5>
              <Image src={mew_wallet} alt="" />
            </div>
          </div>
        </div>
      </Modal>
      <MetaMaskNotFound show={meatMaskShow} handleClose={closeMetaMaskModal} />
    </>
  )
}

export default WalletsPopup
