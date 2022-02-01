import {Container} from 'react-bootstrap'


const CreateNFTBanner = ({title, tagline}) => {
  return (
    <div className='nft_banner'>
      <Container>
        <div className='section_info'>
          {/* <p className='section_small_heading'>{tagline}</p> */}
          <h1 className=' new_item'>{title}</h1>
          
        </div>
      </Container>
    </div>
  )
}

export default CreateNFTBanner
