import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Container, Row, Image, Col, Form } from "react-bootstrap";
import { ReactComponent as BsFillHandbagFill } from "../Assets/react-icons/BsFillHandbagFill.svg";
import { ReactComponent as BsFillTagFill } from "../Assets/react-icons/BsFillTagFill.svg";
import { ReactComponent as HiMenuAlt2 } from "../Assets/react-icons/HiMenuAlt2.svg";
import { useSelector } from "react-redux";
import DefaultModal from "../Components/Modals/DefaultModal/DefaultModal";
import NFTCreateLoading from "../Components/Modals/NFTCreateLoading/NFTCreateLoading";
import NFTCreateSuccess from "../Components/Modals/NFTCreateSuccess/NFTCreateSuccess";
import getContracts from "../Redux/Blockchain/contracts";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import {numberFormate} from '../Utilities/Util'

const Asset = () => {
  const {
    walletType,
    assetInfo: item,
    userAddress,
    profileLoading,
    networkID,
  } = useSelector((state) => state.profile);
  const [type, setType] = useState(null);
  const [price, setprice] = useState("");
  const [auctionPrice, setAuctionPrice] = useState("");
  const [duration, setduration] = useState(null);
  const [nftLoading, setNftLoading] = useState(false);
  const [nftSuccess, setNftSuccess] = useState(false);
  const [hash, setHash] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [popUpShow, setPopUpShow] = useState(false);
  const [owner, setOwner] = useState();
  const [minter, setMinter] = useState();

  const { web3, marketPlace, auction, createNFT, openToBids } = getContracts(
    walletType,
    networkID
  );

  const cld = new Cloudinary({
    cloud: {
      cloudName: "thepangea",
    },
  });

  // Use the image with public ID, 'docs/colored_pencils'.
  const myImage = cld.image("thepangea/" + item.id);
  myImage.resize(thumbnail().width(1000).gravity(focusOn(FocusOn.face())));

  useEffect(() => {
    async function getAddress() {
      var nftId = item.id;
      const Owner = await createNFT.methods.ownerOf(nftId).call();
      const Minter = await createNFT.methods.minterOfToken(nftId).call();
      setMinter(Minter);
      setOwner(Owner);
    }
    getAddress();
  });
  const history = useHistory();

  const getType = (num) => {
    setType(num);
    setPopUpShow(true);
  };

  const createSaleForNFT = async (e) => {
    e.preventDefault();
    try {
      setNftLoading(true);
      setPopUpShow(false);

      const SellPrice = web3.utils.toWei(price, "ether");
      await createNFT.methods
        .approve(marketPlace._address, item.id)
        .send({ from: userAddress });

      const res = await marketPlace.methods
        .createSale(createNFT._address, item.id, SellPrice)
        .send({ from: userAddress });

      if (res?.transactionHash) {
        setNftSuccess(true);
        setNftLoading(false);
        setHash(res?.transactionHash);
        setSuccessTitle("Sale Created Successfully");
      }
    } catch (error) {
      setNftLoading(false);
      console.log(error);
    }
  };

  const createAuctionForNFT = async (e) => {
    e.preventDefault();
    try {
      setNftLoading(true);
      setPopUpShow(false);
      const AuctionPrice = web3.utils.toWei(auctionPrice, "ether");
      await createNFT.methods
        .approve(auction._address, item.id)
        .send({ from: userAddress });
      const res = await auction.methods
        .createAuction(createNFT._address, item.id, AuctionPrice, duration)
        .send({ from: userAddress });
      if (res?.transactionHash) {
        setNftSuccess(true);
        setNftLoading(false);
        setHash(res?.transactionHash);
        setSuccessTitle("Auction Created Successfully");
      }
    } catch (error) {
      setNftLoading(false);
      console.log(error);
    }
  };

  const createOpenToBidsForNFT = async (e) => {
    e.preventDefault();
    try {
      setNftLoading(true);
      await createNFT.methods
        .approve(openToBids._address, item.id)
        .send({ from: userAddress });
      const res = await openToBids.methods
        .createSale(createNFT._address, item.id)
        .send({ from: userAddress });
      if (res?.transactionHash) {
        setNftSuccess(true);
        setNftLoading(false);
        setHash(res?.transactionHash);
        setSuccessTitle("Item Open For Bids!");
      }
    } catch (error) {
      setNftLoading(false);
      console.log(error);
    }
  };

  const handlePriceChange = (e) => {
    const reg = /^[0-9]*\.?[0-9]*$/;
    if (reg.test(e.target.value)) {
      setprice(e.target.value);
    }
  };

  const handlePriceChangeTwo = (e) => {
    const reg = /^[0-9]*\.?[0-9]*$/;
    if (reg.test(e.target.value)) {
      setAuctionPrice(e.target.value);
    }
  };

  const handleDurationChange = (e) => {
    setduration(Number(e.target.value) * 86400);
  };

  return (
    <>
      <div className="single_nft">
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={5} xl={5} className="mb-3">
              <div className="nft__image">
                <AdvancedImage cldImg={myImage}></AdvancedImage>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={7} xl={7} className="mb-3">
              <div className="nft__right">
                <div className="header">
                  <h4>{item.name}</h4>
                  <p>
                    Owned By <span>{owner}</span>{" "}
                  </p>
                  <p>
                    Minted By <span>{minter}</span>{" "}
                  </p>
                  <p>
                    Category <span>{item.category}</span>{" "}
                  </p>
                </div>
                <div className="price_section">
                  {/* <div className='sale_buttons'> */}

                  <div className="sale_buttons">
                    <button onClick={() => getType(0)} className="btn_brand">
                      <BsFillHandbagFill />
                      Sell
                    </button>
                    <button onClick={() => getType(1)} className="btn_brand">
                      <BsFillTagFill />
                      Auction
                    </button>
                    <button
                      onClick={createOpenToBidsForNFT}
                      className="btn_brand"
                    >
                      <BsFillTagFill />
                      Open To Bids
                    </button>
                  </div>

                  {/* </div>  */}
                </div>
                <div className="description">
                  <h5>
                    <span>
                      <HiMenuAlt2 />{" "}
                    </span>
                    <span>Description</span>
                  </h5>
                  <p>{item.description}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <DefaultModal
        title={type === 0 ? "Input Price" : "Input Price and Time"}
        show={popUpShow}
        handleClose={() => setPopUpShow(false)}
        type="success"
      >
        <div className="success__body">
          {type === 0 ? (
            <>
              <Form className="mt-5 input_price">
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="tel"
                    className="form-control shadow-none"
                    placeholder="0.00 ETH"
                    value={price}
                    onChange={(e) => handlePriceChange(e)}
                  />
                </Form.Group>
                <button
                  type="submit"
                  className="btn_brand mt-3"
                  onClick={createSaleForNFT}
                >
                  Submit
                </button>
              </Form>
            </>
          ) : type === 1 ? (
            <>
              <Form className="mt-5 input_price">
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="tel"
                    className="form-control shadow-none"
                    placeholder="0.00 ETH"
                    value={auctionPrice}
                    onChange={(e) => handlePriceChangeTwo(e)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Duration</Form.Label>
                  <select
                    className="shadow-none form-control"
                    onChange={handleDurationChange}
                  >
                    <option hidden={true}>Select Duration</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                    <option value="6">6 Days</option>
                    <option value="7">7 Days</option>
                    <option value="8">8 Days</option>
                    <option value="9">9 Days</option>
                    <option value="10">10 Days</option>
                  </select>
                </Form.Group>
                <button
                  type="submit"
                  className="btn_brand"
                  onClick={createAuctionForNFT}
                >
                  Submit
                </button>
              </Form>
            </>
          ) : null}
        </div>
      </DefaultModal>
      <DefaultModal
        show={nftLoading}
        handleClose={() => setNftLoading(false)}
        type="loading"
      >
        <NFTCreateLoading />
      </DefaultModal>
      <DefaultModal
        show={nftSuccess}
        handleClose={() => setNftSuccess(false)}
        type="success"
      >
        <NFTCreateSuccess title={true} titleInfo={successTitle} hash={hash} />
      </DefaultModal>
    </>
  );
};

export default Asset;
