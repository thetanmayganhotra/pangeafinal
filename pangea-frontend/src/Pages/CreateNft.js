import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import AddForm from '../Components/Nft/AddForm/AddForm'
import CreateNFTBanner from '../Components/Nft/CreateNFTBanner/CreateNFTBanner'

const CreateNft = () => {
  const {userAddress} = useSelector((state) => state.profile)
  if (!userAddress) {
    return <Redirect to='/' />
  }
  return (
    <div>
      <CreateNFTBanner title='Create new item' tagline='NFT' />
      <AddForm />
    </div>
  )
}

export default CreateNft
