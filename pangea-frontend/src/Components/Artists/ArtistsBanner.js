import {useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import getContracts from '../../Redux/Blockchain/contracts'
import {useSelector} from 'react-redux'
import axios from 'axios'
import ArtistCard from './ArtistCard'


const ArtistsBanner = () => {
  const {walletType, userAddress, profileLoading, networkID} = useSelector(
    (state) => state.profile
  )
  const [address, setAddress] = useState()
  // const [myNFTs, setMyNFTs] = useState([])
  // const [hash, setHash] = useState('')
  const {createNFT} = getContracts(walletType, networkID)
  const [ownedBy, setOwnedBy] = useState([])
  const [mintedBy, setMintedBy] = useState([])
  const [CardCount, setCardCount] = useState(16)
  const [loading, setLoading] = useState(false)
  const [allCardsLoaded, setallCardsLoaded] = useState(false)
  const [CardsCounter, setCardsCounter] = useState(false)
  const [Duplicacy, setDuplicacy] = useState(0)

  async function fetchMyNfts() {
    setLoading(true)
    var mintedArray = await createNFT.methods.getNFTMintedByUser(address).call().then(async (mintedArray) => {
      var mintedNfts = mintedBy
      if(Duplicacy == CardCount || Duplicacy > CardCount) {
        setLoading(false)
        setCardsCounter(false)
        return console.log("returning")
      } else {
        setDuplicacy(CardCount)
      }
      var dummyCardCount = CardCount
      var dummyInitialCount = CardCount - 16
      if (dummyCardCount > mintedArray.length) {
        dummyCardCount = mintedArray.length
        setallCardsLoaded(true)
      }
      for (let i = mintedArray.length - dummyInitialCount - 1; i >= mintedArray.length - dummyCardCount; --i) {
      try{
      var uri = await createNFT.methods.tokenURI(mintedArray[i]).call()
      var response = await axios.get(uri)
      var data = response.data
      data.id = mintedArray[i]
      mintedNfts.push(data)
      }
      catch(e){
        console.log(e,"error message")
      }
    }
    setMintedBy(mintedNfts)
    var tokenCounter = await createNFT.methods.getTokenCounter().call().then(async (tokenCounter) => {
    var nfts = ownedBy
    try{
    for (let i = tokenCounter - 1; i >= 0; --i) {
      var owner = await createNFT.methods.ownerOf(i).call()
     
      if (owner.toLowerCase() === address.toLowerCase()) {
        var uri = await createNFT.methods.tokenURI(i).call()
        var response = await axios.get(uri)
        var data = response.data

        data.id = i
        nfts.push(data)
      }
    }
  
    }
    catch(e){
      console.log(e, "that error")
    }
  
    setOwnedBy(nfts)
      setLoading(false)
        })
    })
  }
  return (
    <div className='nft_banner artist_banner'>
      <Container>
        <div className='section_info'>
          {/* <h1 className='section_heading'>Artist</h1> */}
          <h1 style={{color:"white"}}>Artist</h1>
          <div className='wrapper d-flex align-items-center'>
            <input
              placeholder='Search Artists By Id'
              type='text'
              className='form-control shadow-none'
              onChange={(e) => setAddress(e.target.value)}
            />
            <button className='btn_brand ms-3' onClick={fetchMyNfts}>
              Search
            </button>
          </div>
        </div>
        <div className='artist_nfts'>
          {ownedBy?.length > 0 && <h1 className='section_heading'>Owned</h1>}
          <div className='dashboard'>
            <Container>
              {loading && (
                <Row>
                  {Array(10)
                    .fill(0, 0, 4)
                    .map((_) => (
                      <Col xl={3} lg={3} md={6} sm={6} xs={6} className='mb-3'>
                        <div className='nft_card loading'>
                          <div className='nft_card_image_wrapper'>
                            <div className='nft_card_image skeleton'></div>
                            <div className='user_image skeleton'></div>
                          </div>
                          <h6 className='skeleton'></h6>
                          <h6 className='skeleton'></h6>
                          <div className='btn_loading skeleton'></div>
                        </div>
                      </Col>
                    ))}
                </Row>
              )}
              <Row>
                {!loading &&
                  ownedBy.map(
                    (item) => (
                      <Col xl={3} lg={3} md={6} sm={6} xs={6} className='mb-3'>
                        <ArtistCard item={item} />
                      </Col>
                    )
                  )}
              </Row>
            </Container>
          </div>
        </div>
        {mintedBy?.length > 0 && <h1 className='section_heading'>Minted </h1>}
        <Row>
          {loading && (
            <Row>
              {Array(10)
                .fill(0, 0, 4)
                .map((_) => (
                  <Col xl={3} lg={3} md={6} sm={6} xs={6} className='mb-3'>
                    <div className='nft_card loading'>
                      <div className='nft_card_image_wrapper'>
                        <div className='nft_card_image skeleton'></div>
                        <div className='user_image skeleton'></div>
                      </div>
                      <h6 className='skeleton'></h6>
                      <h6 className='skeleton'></h6>
                      <div className='btn_loading skeleton'></div>
                    </div>
                  </Col>
                ))}
            </Row>
          )}
          {!loading &&
            mintedBy.map(
              (item) => (
                <Col xl={3} lg={3} md={6} sm={6} xs={6} className='mb-3'>
                  <ArtistCard item={item} />
                </Col>
              )
            )}
        </Row>
      </Container>
    </div>
  )
}

export default ArtistsBanner
