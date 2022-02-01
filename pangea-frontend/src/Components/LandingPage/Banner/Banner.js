import { Col, Container, Image, Row } from "react-bootstrap";

import { ReactComponent as FaFacebook } from "../../../Assets/react-icons/FaFacebook.svg";
import { ReactComponent as FaInstagram } from "../../../Assets/react-icons/FaInstagram.svg";
import { ReactComponent as FaTwitter } from "../../../Assets/react-icons/FaTwitter.svg";

import { ReactComponent as IoIosRocket } from "../../../Assets/react-icons/IoIosRocket.svg";
import { ReactComponent as HiPencilAlt } from "../../../Assets/react-icons/HiPencilAlt.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Svgs
import ImgOne from "../../../Assets/LandingPage/women-with-vr.webp";
import WalletsPopup from "../../Modals/WalletsPopup/WalletsPopup";
import DisConnect from "../../Modals/DisConnect/DisConnect";
import { useEffect, useState } from "react";

const Banner = () => {
  const { userAddress } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const [openDisconnectModal, setOpenDisconnectModal] = useState(false);
  // wallet popup
  useEffect(() => {
    if (userAddress) {
      setOpen(false);
    }
  }, [userAddress]);

  return (
    <>
      <section className="banner">
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3">
              <div className="banner_left">
                <div className="intro">
                  {/* <p className="section_small_heading">NFT MarketPlace</p> */}
                  <h1 className="section_heading">
                    Discover, create, and sell extraordinary NFTs
                  </h1>
                  {/* <h1 className='section_heading'>
                    The Best Place to Collect , Buy and Sell Awesome NFTs
                  </h1> */}
                  {/* <p>Explore on the world's best & largest NFT marketplace</p> */}
                  <p>Explore one-of-a-kind, advanced NFT marketplace</p>
                  <p>
                    We are "THE PANGEA", a multi chain NFT platform that has
                    integrated Ethereum, Solana, Binance and
                    Polygon (representing 99% of the market share) thereby
                    allowing the entire NFT community to participate through our
                    platform. The Pangea is your NFT market place, your gateway
                    to the metaverse hub.
                  </p>
                </div>
                <div className="banner_buttons">
                  <Link to="/explore">
                    <button className="btn_brand">
                      <span>
                        <IoIosRocket />
                      </span>
                      <span>Explore</span>
                    </button>
                  </Link>
                  {userAddress ? (
                    <Link to="/create-nft">
                      <button className="btn_brand btn_outlined">
                        <span>
                          <HiPencilAlt />
                        </span>
                        Create
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="btn_brand btn_outlined"
                      onClick={() => setOpen(true)}
                    >
                      <span>
                        <HiPencilAlt />
                      </span>
                      Create
                    </button>
                  )}
                </div>

                <p className="social_txt text-left">
                  Follow our social channels and join our movement.
                </p>
                <div className="social_links">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3 bRight">
              <div className="banner_right">
                <Image src={ImgOne} alt="" className="robo_coin" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <WalletsPopup show={open} handleClose={() => setOpen(false)} />
      <DisConnect
        show={openDisconnectModal}
        handleClose={() => setOpenDisconnectModal(false)}
      />
    </>
  );
};

export default Banner;
