import { Container, Row, Image, Col } from "react-bootstrap";
import { v4 as uuid } from "uuid";

// svgs
import WalletLogo from "../../../Assets/LandingPage/Wallet_Svg.svg";

import coinbaseLogo from "../../../Assets/LandingPage/CoinbaseCircle.svg";

import MetamaskLogo from "../../../Assets/LandingPage/MetamaskCircle.svg";

import WalletConnectLogo from "../../../Assets/LandingPage/WalletConnectCircle.svg";
import MEWLogo from "../../../Assets/LandingPage/MEWCircle.svg";

const Wallets = () => {
  const walletsInfo = [
    {
      id: uuid(),
      icon: coinbaseLogo,
      title: "Coinbase",
      info: "wallet that works on both mobile and through a browser extension",
    },
    {
      id: uuid(),
      icon: MetamaskLogo,
      title: "Metamask",
      info: `A browser extension with great flexibility. The web's popular wallet`,
    },
    {
      id: uuid(),
      icon: WalletConnectLogo,
      title: "Walletconnect",
      info: "WalletConnect is an open source protocol for connecting decentralised applications to mobile wallets with QR code scanning or deep linking",
    },
    {
      id: uuid(),
      icon: MEWLogo,
      title: "MEW",
      info: "MEW (MyEtherWallet) is a free, client-side interface helping you interact with the Ethereum blockchain",
    },
  ];
  return (
    <div className="wallets">
      <div className="section_info">
        {/* <p className='section_small_heading'>Wallets</p> */}
        <Image src={WalletLogo} alt="" />
        {/* <h1 className='section_heading'>Connect your wallet</h1> */}
        <h1 style={{ color: "white" }}>Connect your wallet</h1>
        <p>Connect with one of available wallet providers.</p>
      </div>
      <Container>
        <Row className="mt-5 rr">
          {walletsInfo?.map((item) => (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={3}
              xl={3}
              key={item.id}
              className="mb-3"
            >
              <div
                className={item?.title !== "MEW" ? "hw_card" : "hw_card emw"}
              >
                <div className="icon_bg">
                  <Image src={item.icon} alt="" />
                </div>
                <h5>{item.title}</h5>
                <p>{item.info}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Wallets;
