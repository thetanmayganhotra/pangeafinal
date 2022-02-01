import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as BiWalletAlt } from "../../../Assets/react-icons/BiWalletAlt.svg";
import { ReactComponent as BsCloudUpload } from "../../../Assets/react-icons/BsCloudUpload.svg";
import { ReactComponent as MdOutlineSell } from "../../../Assets/react-icons/MdOutlineSell.svg";
import { v4 as uuid } from "uuid";

const HowItWorks = () => {
  const flow = [
    {
      id: uuid(),
      title: "Set up your wallet",
      info: `Connect your wallet to Pangea by clicking the wallet symbol in the top right corner after you've set it up.`,
      icon: <BiWalletAlt />,
    },
    {
      id: uuid(),
      title: "Add your NFTs",
      info: `Upload your work, give it a title and a description, and personalise your NFTs.`,
      icon: <BsCloudUpload />,
    },
    {
      id: uuid(),
      title: "List them for sale",
      info: `You have the option of using auctions or fixed-price listings. You decide how you'd like to sell your NFTs, and we'll assist you!`,
      icon: <MdOutlineSell />,
    },
  ];
  return (
    <div className="how_it_works">
      <div className="section_info">
        {/* <p className='section_small_heading'>How it works</p> */}
        {/* <h1 className='section_heading'>Create and sell your NFTs</h1> */}
        <h1 style={{ color: "white" }}>Create and sell your NFTs</h1>
      </div>
      <Container>
        <Row className="mt-5 rr">
          {flow?.map((item) => (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={4}
              xl={4}
              key={item.id}
              className="mb-3"
            >
              <div className="hw_card">
                <div className="icon_bg">{item.icon}</div>
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

export default HowItWorks;
