import {Col, Container, Image, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {ReactComponent as FaRegEnvelope} from "../../Assets/react-icons/FaRegEnvelope.svg"

// Svgs
import Logo from '../../Assets/LandingPage/logo_white.png'

const Footer = () => {
  return (
    <>
    <footer className="footer-light" style={{marginTop:"100px"}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5 style={{color:"white"}} >Marketplace</h5>
                            <ul>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> All NFTs </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Art </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Music </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Domain Names </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Virtual World </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Collectibles </h6> </Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5 style={{color:"white"}}>Resources</h5>
                            <ul>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Help Center </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Partners </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Suggestions </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Discord </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Docs </h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Newsletter </h6> </Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5 style={{color:"white"}}>Community</h5>
                            <ul>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Community</h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Documentation</h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Brand Assets</h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Blog</h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Forum</h6> </Link></li>
                                <li style={{color:"transparent", marginLeft:"-30px"}}><Link to=""> <h6 style={{color:"#a2a2a2"}}> Mailing List</h6> </Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5 style={{color:"white"}}>Newsletter</h5>
                            <p style={{color:"#a2a2a2"}}>Signup for our newsletter to get the latest news in your inbox.</p>
                            <form action="#" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                                <div className="col text-center">
                                    <input className="form-controls" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" /> 
                                    <Link to="" id="btn-subscribe">
                                      <i className="arrow_right bg-color-secondary"></i>
                                    </Link>
                                    <div className="clearfix"></div>
                                </div>
                            </form>
                            <div className="spacer-10"></div>
                            <small style={{color:"#a2a2a2"}}>Your email is safe with us. We don't spam.</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="de-flex">
                                <div className="de-flex-col">
                                    <span onClick={()=> window.open("", "_self")}>
                                        <img alt="" className="f-logo d-1" src="./img/logo.png" />
                                        <img alt="" className="f-logo d-3" src="./img/logo-2-light.png" />
                                        <img alt="" className="f-logo d-4" src="./img/logo-3.png" />
                                        {/* <span className="copy">&copy; Copyright 2021 - Gigaland by Designesia</span> */}
                                    </span>
                                </div>
                                <div className="de-flex-col">
                                    <div className="social-icons">
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-facebook fa-lg"></i></span>
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-twitter fa-lg"></i></span>
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-linkedin fa-lg"></i></span>
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-pinterest fa-lg"></i></span>
                                        <span onClick={()=> window.open("", "_self")}><i className="fa fa-rss fa-lg"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    <footer className='footer'>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='c'>
            <Link to='/'>
              <Image src={Logo} alt='' className='imgg' />
            </Link>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='text-center c'>
            <p className='text-decoration-underline'>Terms & Conditions</p>
            <p className='copyright'>
              Copyright &copy; {new Date().getFullYear()}. All rights reserved
              by Pangea
            </p>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} xl={4} className='text-end c'>
            <span className='envelope_wrapper'>
              <FaRegEnvelope />
            </span>
            <a href='mailto:Info@pangea.com'>Info@pangea.com</a>
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  )
}

export default Footer
