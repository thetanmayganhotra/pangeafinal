import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import CreateNFTBanner from '../Components/Nft/CreateNFTBanner/CreateNFTBanner'
import Dashboard from '../Components/Portfolio/Dashboard/Dashboard'

const Portfolio = () => {
  const {userAddress} = useSelector((state) => state.profile)
  if (!userAddress) {
    return <Redirect to='/' />
  }
  return (
    <div>
      <CreateNFTBanner title='Portfolio' tagline='My Collections' />
      <Dashboard />
    </div>
  )
}

export default Portfolio
