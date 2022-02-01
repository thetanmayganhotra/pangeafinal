import {Col, Container, Row} from 'react-bootstrap'

const ArtistsWrapper = () => {
  return (
    <div className='artists_details_wrapper'>
      <Container>
        {/* <div className='artist_card'>
          <Row>
            <Col xl={3} lg={3} md={6} sm={12} xs={12} className='my-3'>
              <div className='user_image'>
                <Image
                  src='https://avatars.githubusercontent.com/u/42517251?v=4'
                  alt=''
                />
              </div>
            </Col>
            <Col xl={9} lg={9} md={6} sm={12} xs={12} className='my-3'>
              <div className='deatils'>
                <h4>CONSTANTIN</h4>
                <p>0x5db6f1e3a4c46b06ed10e2b39f75c1df9518dcc5</p>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Fugiat delectus modi ea cumque sint totam perspiciatis
                  doloribus, ex corporis nemo!
                </p>
              </div>
            </Col>
          </Row>
        </div> */}
        <div className='artist_nfts'>
          <h1 className='section_heading'>Owned By</h1>
          <Row>
            <Col xl={3} lg={3} md={6} sm={6} xs={6} className='mb-3'>
                
            </Col>
          </Row>
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
          <h1 className='section_heading'>Minted By</h1>
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
        </div>
      </Container>
    </div>
  )
}

export default ArtistsWrapper
