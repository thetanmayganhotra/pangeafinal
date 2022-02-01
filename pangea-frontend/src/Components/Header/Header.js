import { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Image,
  Navbar,
  OverlayTrigger,
  Popover,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ReactComponent as BsWallet2 } from "../../Assets/react-icons/BsWallet2.svg";
import WalletsPopup from "../Modals/WalletsPopup/WalletsPopup";

// Svgs
import Logo from "../../Assets/LandingPage/logo_white.png";
import eth from "../../Assets/ethereum.svg";
import Bnb from "../../Assets/bnb.svg";
import polygon from "../../Assets/polygon.svg";
import MetaMask from "../../Assets/MetaMask.svg";
import Coinbase from "../../Assets/coinbase_Wallet.svg";
import walletConnect_wallet from "../../Assets/LandingPage/WalletConnectCircle.svg";
import mew_wallet from "../../Assets/mew.svg";
import { useLocation } from "react-router-dom";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import DisConnect from "../Modals/DisConnect/DisConnect";
import {
  AddNetworks,
  getNetwork,
  setNetwork,
} from "../../Redux/Profile/actions";

const Header = () => {
  // redux state
  const dispatch = useDispatch();
  const { userAddress, walletType, networkID } = useSelector(
    (state) => state.profile
  );
  const { pathname } = useLocation();

  const [showScroll, setShowScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDisconnectModal, setOpenDisconnectModal] = useState(false);
  const [header, setHeader] = useState(true);

  // header color
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset >= 10) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 10) {
      setShowScroll(false);
    }
  };
  window.addEventListener("scroll", checkScrollTop);

  // wallet popup
  useEffect(() => {
    if (userAddress) {
      setOpen(false);
    }
  }, [userAddress]);

  const [netID, setNetID] = useState(null);

  const selectNetwork = (type, id) => {
    dispatch(AddNetworks(type));
    dispatch(getNetwork(id));
  };

  useEffect(() => {
    dispatch(setNetwork());
  }, []);
  useEffect(() => {
    setNetID(networkID);
  }, [networkID]);

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/about" ||
      pathname === "/community" ||
      pathname === "/token"
    ) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  }, [pathname]);

  const popover = (
    <Popover id="popover-basic" className="networks_modal">
      <div className="popover-header">Networks</div>
      <div className="popover-body gfg">
        <div
          className="net"
          onClick={() => {
            selectNetwork("ethereum", "4");
          }}
        >
          <img src={eth} alt="" />
        </div>
        <div
          className="net"
          onClick={() => {
            selectNetwork("bnb", "97");
          }}
        >
          <img src={Bnb} alt="" />
        </div>
        <div
          className="net"
          onClick={() => {
            selectNetwork("polygon", "80001");
          }}
        >
          <img src={polygon} alt="" />
        </div>
      </div>
    </Popover>
  );

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        fixed="top"
        className={
          showScroll
            ? "navbar navbar-expand-lg navbar-dark fixed-top navbar__bg"
            : "navbar navbar-expand-lg navbar-dark fixed-top"
        }
      >
        <Container fluid>
          <div className="network_select mode">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              rootClose={true}
            >
              <div className="img_net">
                <Image
                  src={
                    netID === "80001"
                      ? polygon
                      : netID === "97"
                      ? Bnb
                      : netID === "4"
                      ? eth
                      : ""
                  }
                  alt=""
                />
              </div>
            </OverlayTrigger>
          </div>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image src={Logo} alt="" className="d-inline-block align-top" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto nav__ mx-auto">
              <div className="navbar__left">
                <LinkContainer to="/" exact={true}>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/explore">
                  <Nav.Link>Explore</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/market-place">
                  <Nav.Link>Market Place</Nav.Link>
                </LinkContainer>
                {header ? (
                  <>
                    {/* <LinkContainer to='/about'>
                      <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/community'>
                      <Nav.Link>Community</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/token'>
                      <Nav.Link>Pangea Token</Nav.Link>
                    </LinkContainer> */}
                    <NavDropdown
                      id="nav-black"
                      title="Menu"
                      // menuVariant='dark'
                    >
                      <NavDropdown.Item
                        style={{ backgroundColor: "black" }}
                        href="/help"
                      >
                        Help
                      </NavDropdown.Item>
                      <br />
                      <NavDropdown.Item
                        style={{ backgroundColor: "black" }}
                        href="/login"
                      >
                        Login
                      </NavDropdown.Item>
                      <br />
                      <NavDropdown.Item
                        style={{ backgroundColor: "black" }}
                        href="/register"
                      >
                        Register
                      </NavDropdown.Item>
                      <br />
                      <NavDropdown.Item
                        style={{ backgroundColor: "black" }}
                        href="/contact"
                      >
                        Contact US
                      </NavDropdown.Item>
                      <br />
                      <NavDropdown.Item
                        style={{ backgroundColor: "black" }}
                        href="/Activity"
                      >
                        Activity
                      </NavDropdown.Item>
                      <br />
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    {!userAddress ? (
                      <Nav.Link onClick={() => setOpen(true)}>
                        Create NFT
                      </Nav.Link>
                    ) : (
                      <LinkContainer to="/create-nft">
                        <Nav.Link>Create NFT</Nav.Link>
                      </LinkContainer>
                    )}
                    <LinkContainer to="/auctions">
                      <Nav.Link>Auctions</Nav.Link>
                    </LinkContainer>
                    {/* <LinkContainer to='/artists'>
                      <Nav.Link>Open To Bids</Nav.Link>
                    </LinkContainer> */}

                    <LinkContainer to="/opentobids">
                      <Nav.Link>Open To Bids</Nav.Link>
                    </LinkContainer>
                  </>
                )}
                {userAddress && (
                  <LinkContainer to="/portfolio">
                    <Nav.Link>Portfolio</Nav.Link>
                  </LinkContainer>
                )}
              </div>
              <div className="navbar__right">
                <div className="network_select desk">
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={popover}
                    rootClose={true}
                  >
                    <div className="img_net">
                      <Image
                        src={
                          netID === "80001"
                            ? polygon
                            : netID === "97"
                            ? Bnb
                            : netID === "4"
                            ? eth
                            : ""
                        }
                        alt=""
                      />
                    </div>
                  </OverlayTrigger>
                </div>
                {!userAddress ? (
                  <button
                    className="btn_brand btn_outlined"
                    onClick={() => setOpen(true)}
                  >
                    <BsWallet2 />
                    Connect Wallet
                  </button>
                ) : (
                  <button
                    className="btn_brand btn_outlined user_id"
                    onClick={() => setOpenDisconnectModal(true)}
                  >
                    <Image
                      src={
                        walletType === "MetaMask"
                          ? MetaMask
                          : walletType === "Coinbase"
                          ? Coinbase
                          : walletType === "WalletConnector"
                          ? walletConnect_wallet
                          : walletType === "MEW"
                          ? mew_wallet
                          : ""
                      }
                      alt=""
                    />
                    <a>{`${userAddress.substring(
                      0,
                      5
                    )}...${userAddress.substring(userAddress.length - 6)}`}</a>
                  </button>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <WalletsPopup show={open} handleClose={() => setOpen(false)} />
      <DisConnect
        show={openDisconnectModal}
        handleClose={() => setOpenDisconnectModal(false)}
      />
    </>
  );
};

export default Header;
