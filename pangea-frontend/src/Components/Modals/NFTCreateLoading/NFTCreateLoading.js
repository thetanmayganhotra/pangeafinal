import {Image} from 'react-bootstrap'

// image
import Loader from '../../../Assets/Loader.svg'

const NFTCreateLoading = () => {
  return (
    <div className='success__body'>
      <Image src={Loader} alt='' className='mb-3 update__spinner loader' />
      <h4 className='mt-3'>Waiting for response</h4>
    </div>
  )
}

export default NFTCreateLoading
