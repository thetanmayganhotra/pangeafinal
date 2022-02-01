import MainWrapper from '../Components/MarketPlace/MainWrapper/MainWrapper'
import CreateNFTBanner from '../Components/Nft/CreateNFTBanner/CreateNFTBanner'

const MarketPlace = () => {
  return (
    <div>
      <CreateNFTBanner title='Market place' tagline='Exclusive NFTs' />
      <MainWrapper />
    </div>
  )
}

export default MarketPlace
