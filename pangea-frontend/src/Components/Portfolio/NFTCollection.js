import { Form, Image } from "react-bootstrap";
import { ReactComponent as BsFillHandbagFill } from "../../Assets/react-icons/BsFillHandbagFill.svg";
import { ReactComponent as BsFillTagFill } from "../../Assets/react-icons/BsFillTagFill.svg";

// svg
// import image from '../../../Assets/nft/nft__img.jpg'
import { Link } from "react-router-dom";
// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import getContracts from "../../Redux/Blockchain/contracts";
import NFTCreateLoading from "../Modals/NFTCreateLoading/NFTCreateLoading";
import NFTCreateSuccess from "../Modals/NFTCreateSuccess/NFTCreateSuccess";
import DefaultModal from "../Modals/DefaultModal/DefaultModal";
import { setAssetData } from "../../Redux/Profile/actions";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

// import {getNftType} from '../../../Redux/Profile/actions'

const NFTCollection = ({ item, transID }) => {
  // redux state
  const cld = new Cloudinary({
    cloud: {
      cloudName: "thepangea",
    },
  });
  const { walletType, userAddress, profileLoading, networkID } = useSelector(
    (state) => state.profile
  );
  // Use the image with public ID, 'docs/colored_pencils'.
  let myImage;
  if (networkID === "4") myImage = cld.image("thepangea/" + item.id);
  else if (networkID === "97") myImage = cld.image("thepangeaBin/" + item.id);
  else myImage = cld.image("thepangeaPoly/" + item.id);
  // const myImage = cld.image("thepangea/" + item.id);
  console.log("Item id:", item.id);
  myImage.resize(thumbnail().width(350).gravity(focusOn(FocusOn.face())));

  const dispatch = useDispatch();
  const [popUpShow, setPopUpShow] = useState(false);
  const [type, setType] = useState(null);

  const { web3, marketPlace, auction, createNFT, openToBids } = getContracts(
    walletType,
    networkID
  );
  const [price, setprice] = useState("");
  const [auctionPrice, setAuctionPrice] = useState("");
  const [duration, setduration] = useState(null);

  const [nftLoading, setNftLoading] = useState(false);
  const [nftSuccess, setNftSuccess] = useState(false);
  const [hash, setHash] = useState("");
  const [successTitle, setSuccessTitle] = useState("");

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
      <div className="nft_card" onClick={() => dispatch(setAssetData(item))}>
        <div className="nft_card_image_wrapper">
          <Link to="/asset">
            <div className="nft_card_image">
              <AdvancedImage cldImg={myImage}></AdvancedImage>
            </div>
          </Link>
          <Link to="/artists">
            <div className="user_image">
              <AdvancedImage cldImg={myImage}></AdvancedImage>
            </div>
          </Link>
        </div>
        <Link to="/asset">
          <h6 title={item?.name}>{item?.name}</h6>
        </Link>
        <div className="d-flex align-items-center justify-content-between">
          <button className="btn_brand btn_outlined" onClick={() => getType(0)}>
            <BsFillHandbagFill />
            Sell
          </button>

          <button className="btn_brand btn_outlined" onClick={() => getType(1)}>
            <BsFillTagFill />
            Auction
          </button>

          <button
            className="btn_brand btn_outlined"
            onClick={createOpenToBidsForNFT}
          >
            <BsFillTagFill />
            Open To Bids
          </button>
        </div>
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

export default NFTCollection;
