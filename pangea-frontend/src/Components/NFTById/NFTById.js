import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Image, Col, Form } from "react-bootstrap";
import { ReactComponent as HiMenuAlt2 } from "../../Assets/react-icons/HiMenuAlt2.svg";
import { ReactComponent as BiWalletAlt } from "../../Assets/react-icons/BiWalletAlt.svg";
import { ReactComponent as BsTag } from "../../Assets/react-icons/BsTag.svg";
import { useParams, useHistory } from "react-router-dom";
import DefaultModal from "../Modals/DefaultModal/DefaultModal";
import { useLocation } from "react-router-dom";

// img
import getContracts from "../../Redux/Blockchain/contracts";
import axios from "axios";
import CountDown from "../Countdown/CountDown";
import NFTCreateSuccess from "../Modals/NFTCreateSuccess/NFTCreateSuccess";
import NFTCreateLoading from "../Modals/NFTCreateLoading/NFTCreateLoading";
import { numberFormate } from "../../Utilities/Util";
import WalletsPopup from "../Modals/WalletsPopup/WalletsPopup";
import DisConnect from "../Modals/DisConnect/DisConnect";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import { createNFTAddress } from '../../Redux/Blockchain/Abi/createNFT'

const NFTById = (props) => {
  const location = useLocation();
  const { walletType, userAddress, profileLoading, nftCardType, networkID } =
    useSelector((state) => state.profile);
  // const [web3, setWeb3] = useState(null)
  const [open, setOpen] = useState(false);
  const [openDisconnectModal, setOpenDisconnectModal] = useState(false);
  console.log("Type: ", nftCardType);
  // wallet popup
  useEffect(() => {
    if (userAddress) {
      setOpen(false);
    }
  }, [userAddress]);
  const [done, setDone] = useState(false);
  const { web3, marketPlace, auction, createNFT, openToBids } = getContracts(
    walletType,
    networkID
  );
  const { id } = useParams();
  let history = useHistory();
  const [nft, setNft] = useState({});
  const [loading, setLoading] = useState(false);
  const [popUpShowAuction, setpopUpShowAuction] = useState(false);
  const [popUpShowOpenToBids, setpopUpShowOpenToBids] = useState(false);
  const [time, setTime] = useState(0);
  const [bid, setbid] = useState("");
  const [disableForUser, setdisableForUser] = useState(false);
  const [disableForOwner, setdisableForOwner] = useState(false);

  const [nftLoading, setNftLoading] = useState(false);
  const [nftSuccess, setNftSuccess] = useState(false);
  const [hash, setHash] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [isHighestBidder, setIsHighestBidder] = useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "thepangea",
    },
  });

  // Use the image with public ID, 'docs/colored_pencils'.
  console.log(props.location);
  let myImage;
  if (networkID === "4")
    myImage = cld.image("thepangea/" + props.location.state.message);
  else if (networkID === "97")
    myImage = cld.image("thepangeaBin/" + props.location.state.message);
  else myImage = cld.image("thepangeaPoly/" + props.location.state.message);
  myImage.resize(thumbnail().width(1000).gravity(focusOn(FocusOn.face())));
  // var myImage = null;
  useEffect(() => {
    console.log(location.pathname.split("/")[1]);
    if (location.pathname.split("/")[1] === "nft") {
      async function getMarketItem() {
        setLoading(true);
        var item = await marketPlace.methods.idToMarketItem(id).call();
        if (item.seller.toLowerCase() === userAddress.toLowerCase()) {
          setdisableForOwner(true);
        } else {
          setdisableForUser(true);
        }
        try {
          var uri = await createNFT.methods.tokenURI(item.tokenId).call();
          var response = await axios.get(uri);
          console.log(response);
          var data = response.data;
          data.price = web3.utils.fromWei(item.price.toString(), "ether");
          data.seller = item.seller;
          setNft(data);
        } catch (error) {
          console.log(error, "this is error");
        }
        setLoading(false);
      }
      getMarketItem();
    } else if (location.pathname.split("/")[1] === "auction") {
      console.log("Here");
      async function getAuctionItem() {
        setLoading(true);
        var auctionNFT = await auction.methods.idToAuction(id).call();
        if (auctionNFT.seller.toLowerCase() === userAddress.toLowerCase()) {
          setdisableForOwner(true);
        } else {
          setdisableForUser(true);
        }
        try {
          var uri = await createNFT.methods.tokenURI(auctionNFT.tokenId).call();
          var response = await axios.get(uri);
          var data = response.data;
          console.log("Item: ", data);
          // myImage = await axios.get(data.image);
          data.price =
            auctionNFT.amount > 0
              ? web3.utils.fromWei(auctionNFT.amount.toString(), "ether")
              : web3.utils.fromWei(auctionNFT.reservePrice.toString(), "ether");

          data.highestBidder = auctionNFT.bidder;
          data.id = auctionNFT.tokenId;
          data.auctionId = auctionNFT.auctionId; //auctionid (mapping variable )
          data.seller = auctionNFT.seller;
          setNft(data);
          setLoading(false);
        } catch (error) {
          console.log(error, "this is error");
        }
      }
      getAuctionItem();
    } else {
      async function getOpenToBidsItem() {
        setLoading(true);
        var item = await openToBids.methods.idToMarketItem(id).call();
        if (item.seller.toLowerCase() === userAddress.toLowerCase()) {
          setdisableForOwner(true);
        } else {
          setdisableForUser(true);
        }
        try {
          var uri = await createNFT.methods.tokenURI(item.tokenId).call();
          var response = await axios.get(uri);
          console.log(response);
          var data = response.data;
          data.highestBid = web3.utils.fromWei(
            item.highestBid.toString(),
            "ether"
          );
          data.seller = item.seller;
          setNft(data);
        } catch (error) {
          console.log(error, "this is error");
        }
        setLoading(false);
      }
      getOpenToBidsItem();
    }
  }, [id, userAddress]);

  useEffect(() => {
    const getNFtCountdown = async () => {
      // const {auction} = getContracts(walletType)
      if (auction) {
        try {
          const transaction = await auction.methods
            .timeLeftForAuctionToEnd(id)
            .call();
          setTime(transaction);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getNFtCountdown();
  }, [id, userAddress]);

  const handleBidChange = (e) => {
    setbid(e.target.value);
  };

  async function buyItem(e) {
    e.preventDefault();
    try {
      setNftLoading(true);
      const res = await marketPlace.methods.buyItem(id).send({
        from: userAddress,
        value: web3.utils.toWei(nft.price, "ether"),
      });
      if (res?.transactionHash) {
        setNftLoading(false);
        setNftSuccess(true);
        setHash(res?.transactionHash);
        setSuccessTitle("NFT Bought Successfully!");
      }
    } catch (error) {
      console.log(error);
      setNftLoading(false);
    }
  }

  async function placeBid(e) {
    e.preventDefault();
    try {
      setNftLoading(true);
      const res = await auction.methods
        .placeBid(id)
        .send({ from: userAddress, value: web3.utils.toWei(bid, "ether") });
      if (res?.transactionHash) {
        setNftLoading(false);
        setNftSuccess(true);
        setHash(res?.transactionHash);
        setpopUpShowAuction(false);
        setSuccessTitle("NFT Bid Placed Successfully!");
      }
    } catch (error) {
      console.log(error);
      setNftLoading(false);
    }
  }

  async function endSale(e) {
    e.preventDefault();
    try {
      setNftLoading(true);
      const res = await marketPlace.methods
        .EndSale(id)
        .send({ from: userAddress });
      if (res?.transactionHash) {
        setNftLoading(false);
        setNftSuccess(true);
        setHash(res?.transactionHash);
        setSuccessTitle("NFT Sale Ended");
      }
    } catch (error) {
      console.log(error);
      setNftLoading(false);
    }
  }

  async function endAuction(e) {
    e.preventDefault();
    try {
      setNftLoading(true);
      const res = await auction.methods
        .endAuction(nft.auctionId)
        .send({ from: userAddress });
      if (res?.transactionHash) {
        setNftLoading(false);
        setNftSuccess(true);
        setHash(res?.transactionHash);
        setSuccessTitle("NFT Auction Ended");
      }
    } catch (error) {
      console.log(error);
      setNftLoading(false);
    }
  }

  async function cancelAuction(e) {
    e.preventDefault();
    try {
      setNftLoading(true);
      const res = await auction.methods
        .cancelAuction(nft.auctionId)
        .send({ from: userAddress });
      if (res?.transactionHash) {
        setNftLoading(false);
        setNftSuccess(true);
        setHash(res?.transactionHash);
        setSuccessTitle("NFT Auction Cancelled");
      }
    } catch (error) {
      console.log(error);
      setNftLoading(false);
    }
  }

  async function bidOpen(e) {
    e.preventDefault();
    try {
      setNftLoading(true);
      const res = await openToBids.methods
        .bidOnItem(id)
        .send({ from: userAddress, value: web3.utils.toWei(bid, "ether") });
      if (res?.transactionHash) {
        setNftLoading(false);
        setNftSuccess(true);
        setHash(res?.transactionHash);
        setpopUpShowAuction(false);
        setSuccessTitle("NFT Bid Placed Successfully!");
      }
    } catch (error) {
      console.log(error);
      setNftLoading(false);
    }
  }

  async function endBidding(e) {
    e.preventDefault();
    try {
      setNftLoading(true);
      const res = await openToBids.methods
        .EndSale(id)
        .send({ from: userAddress });
      if (res?.transactionHash) {
        setNftLoading(false);
        setNftSuccess(true);
        setHash(res?.transactionHash);
        setSuccessTitle("NFT Sale Ended");
      }
    } catch (error) {
      console.log(error);
      setNftLoading(false);
    }
  }
  useEffect(() => {
    if (time?.timeleft > 0) {
      setDone(false);
    } else {
      setDone(true);
    }
  }, [time, userAddress]);

  const ClaimCheckNFT = async () => {
    try {
      if (done) {
        const res = await auction.methods.isHighestBidder(id).call();
        if (res.toLowerCase() === userAddress.toLowerCase()) {
          setIsHighestBidder(true);
        }
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (userAddress && done) {
      ClaimCheckNFT();
    }
  }, [userAddress, done]);

  const claimNFT = async () => {
    try {
      setNftLoading(true);
      const res = await auction.methods.claimNft(id).send({
        from: userAddress,
      });
      if (res?.transactionHash) {
        setNftLoading(false);
        setNftSuccess(true);
        setHash(res?.transactionHash);
        setSuccessTitle("NFT Claimed Succesfully");
      }
    } catch (error) {
      console.log(error);
      setNftLoading(false);
    }
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
                  <h4>{nft.name}</h4>
                  <p>
                    Owned By <span>{nft.seller}</span>{" "}
                  </p>
                </div>
                <div className="price_section">
                  {location.pathname.split("/")[1] === "openToBids" ? (
                    <div>
                      <h6>Current highest Bid</h6>
                      <h2>
                        {loading ? 0 : numberFormate(nft?.highestBid)} ETH
                      </h2>
                    </div>
                  ) : (
                    <div>
                      <h6>Current Price</h6>
                      <h2>{loading ? 0 : numberFormate(nft?.price)} ETH</h2>
                    </div>
                  )}

                  {/* <div className='sale_buttons'> */}
                  {nftCardType === 1 && !done && time?.timeleft > 0 && (
                    <CountDown
                      timeInMilisecs={time?.timeleft * 1000}
                      setDone={setDone}
                    />
                  )}
                  {/* <CountDown timeInMilisecs={10000} setDone={setDone} /> */}

                  {!userAddress ? (
                    <div className="sale_buttons">
                      <button
                        className="btn_brand"
                        onClick={() => setOpen(true)}
                      >
                        Connect Wallet
                      </button>
                    </div>
                  ) : (
                    <>
                      {location.pathname.split("/")[1] === "nft" ? (
                        <div className="sale_buttons">
                          {/* <button
                            className={
                              disableForOwner
                                ? 'btn_brand btn_brand_disabled'
                                : 'btn_brand'
                            }
                            onClick={buyItem}
                            disabled={disableForOwner}
                          >
                            <BiWalletAlt /> Buy now
                          </button> */}
                          {!disableForOwner && (
                            <button
                              className={
                                disableForOwner ? "btn_brand" : "btn_brand"
                              }
                              onClick={buyItem}
                            >
                              <BiWalletAlt /> Buy now
                            </button>
                          )}
                          {!disableForUser && (
                            <button className="btn_brand" onClick={endSale}>
                              End Sale
                            </button>
                          )}
                        </div>
                      ) : location.pathname.split("/")[1] === "auction" ? (
                        <div className="sale_buttons">
                          {!done && !disableForOwner && (
                            <button
                              className="btn_brand"
                              onClick={() => setpopUpShowAuction(true)}
                            >
                              <BsTag /> Make Offer
                            </button>
                          )}

                          {/* Please Use Condition Here fror this button */}
                          {done && isHighestBidder && (
                            <button
                              className="btn_brand"
                              onClick={() => claimNFT()}
                            >
                              Claim NFT
                            </button>
                          )}
                          {/* Please Use Condition Here fror this button */}

                          {!disableForUser && (
                            <button className="btn_brand" onClick={endAuction}>
                              End Auction
                            </button>
                          )}
                          {!disableForUser && (
                            <button
                              className="btn_brand"
                              onClick={cancelAuction}
                            >
                              Cancel Auction
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="sale_buttons">
                          {!done && !disableForOwner && (
                            <button
                              className="btn_brand"
                              onClick={() => setpopUpShowOpenToBids(true)}
                            >
                              <BsTag /> Make Offer
                            </button>
                          )}

                          {/* Please Use Condition Here fror this button */}
                          {/* {done && isHighestBidder && (
                            <button
                              className="btn_brand"
                              onClick={() => claimNFT()}
                            >
                              Claim NFT
                            </button>
                          )} */}
                          {/* Please Use Condition Here fror this button */}

                          {!disableForUser && (
                            <button className="btn_brand" onClick={endBidding}>
                              End Bidding
                            </button>
                          )}
                          {/* {!disableForUser && (
                            <button
                              className="btn_brand"
                              onClick={cancelAuction}
                            >
                              Cancel Auction
                            </button>
                          )} */}
                        </div>
                      )}
                    </>
                  )}

                  {/* </div>  */}
                </div>
                <div className="description">
                  <h5>
                    <span>
                      <HiMenuAlt2 />{" "}
                    </span>
                    <span>Description</span>
                  </h5>
                  <p>{nft.description}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <DefaultModal
        title={"Bid NFT"}
        show={popUpShowAuction}
        handleClose={() => setpopUpShowAuction(false)}
        type="fail"
      >
        <div className="success__body">
          <Form className="mt-5 input_price">
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="tel"
                className="form-control shadow-none"
                placeholder="0.00 ETH"
                onChange={handleBidChange}
              />
              {bid < nft?.price && (
                <span
                  className="text-danger"
                  style={{ fontSize: "11px", textAlign: "center" }}
                >
                  Bid Price Should be more than Actual Price
                </span>
              )}
            </Form.Group>
            <button
              disabled={bid < nft?.price}
              type="submit"
              className={
                bid < nft?.price ? "btn_brand_disabled btn_brand" : "btn_brand"
              }
              onClick={placeBid}
            >
              Place a Bid
            </button>
          </Form>
        </div>
      </DefaultModal>
      <DefaultModal
        title={"Bid NFT"}
        show={popUpShowOpenToBids}
        handleClose={() => setpopUpShowOpenToBids(false)}
        type="fail"
      >
        <div className="success__body">
          <Form className="mt-5 input_price">
            <Form.Group className="mb-3">
              <Form.Label>Highest Bid</Form.Label>
              <Form.Control
                type="tel"
                className="form-control shadow-none"
                placeholder="0.00 ETH"
                onChange={handleBidChange}
              />
              {bid < nft?.highestBid && (
                <span
                  className="text-danger"
                  style={{ fontSize: "11px", textAlign: "center" }}
                >
                  Bid Price Should be more than current Highest Bid
                </span>
              )}
            </Form.Group>
            <button
              disabled={bid < nft?.highestBid}
              type="submit"
              className={
                bid < nft?.highestBid
                  ? "btn_brand_disabled btn_brand"
                  : "btn_brand"
              }
              onClick={bidOpen}
            >
              Place a Bid
            </button>
          </Form>
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
      <WalletsPopup show={open} handleClose={() => setOpen(false)} />
      <DisConnect
        show={openDisconnectModal}
        handleClose={() => setOpenDisconnectModal(false)}
      />
    </>
  );
};

export default NFTById;
