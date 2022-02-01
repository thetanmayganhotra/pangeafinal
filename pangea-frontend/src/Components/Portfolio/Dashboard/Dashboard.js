import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as FiCopy } from "../../../Assets/react-icons/FiCopy.svg";
import useClipboard from "react-use-clipboard";
import axios from "axios";
// svg
// import image from '../../../Assets/nft/nft__img.jpg'
// import {format} from 'url'
import getContracts from "../../../Redux/Blockchain/contracts";
import NFTCollection from "../NFTCollection";

import api from "../../core/api/api";

const Dashboard = () => {
  const { walletType, userAddress, profileLoading, networkID } = useSelector(
    (state) => state.profile
  ); //   clipboard
  const [isCopied, setCopied] = useClipboard(userAddress, {
    successDuration: 2000,
  });
  const [myNFTs, setMyNFTs] = useState([]);
  const [hash, setHash] = useState("");
  // const [images, setimages] = useState([])
  const [imageSrc, setImageSrc] = useState([]);
  const [userName, setUserName] = useState("UserName");
  const { createNFT } = getContracts(walletType, networkID);

  // useEffect(() => {
  //   if (userName?.length <= 0) {
  //     setUserName('UserName')
  //   }
  // }, [userName])

  const [CardCount, setCardCount] = useState(50);
  const [loading, setLoading] = useState(false);
  const [allCardsLoaded, setallCardsLoaded] = useState(false);
  const [CardsCounter, setCardsCounter] = useState(false);
  const [Duplicacy, setDuplicacy] = useState(0);
  const [TotalCards, setTotalCards] = useState(-1);
  const [LastCard, setLastCard] = useState([]);

  useEffect(() => {
    async function fetchMyNfts() {
      setLoading(true);
      var tokenCounter = await createNFT.methods
        .getTokenCounter()
        .call()
        .then(async (tokenCounter) => {
          var nfts = myNFTs;
          console.log(Duplicacy, CardCount);
          if (Duplicacy == CardCount || Duplicacy > CardCount) {
            setLoading(false);
            setCardsCounter(false);
            return console.log("returning");
          } else {
            setDuplicacy(CardCount);
          }
          var dummyCardCount = CardCount;
          var dummyInitialCount = CardCount - 50;
          if (dummyCardCount > tokenCounter) {
            dummyCardCount = tokenCounter;
            setallCardsLoaded(true);
          } else if (dummyCardCount === tokenCounter || tokenCounter === 0) {
            dummyCardCount = tokenCounter;
            setallCardsLoaded(true);
          }
          for (
            let i = tokenCounter - dummyInitialCount - 1;
            i >= tokenCounter - dummyCardCount;
            --i
          ) {
            var owner = await createNFT.methods.ownerOf(i).call();

            try {
              if (owner.toLowerCase() === userAddress) {
                console.log("Returing");
                var uri = await createNFT.methods.tokenURI(i).call();
                var response = await axios.get(uri);
                var data = response.data;

                data.id = i;
                // setLastCard((prevState) => {
                //   prevState.push(data.id)
                // })
                // console.log(LastCard.indexOf(data.id))
                nfts.push(data);
              }
            } catch (error) {
              console.log(error, "this is the error");
            }
          }
          if (dummyCardCount > tokenCounter) {
            setCardCount(tokenCounter);
          } else if (dummyCardCount === tokenCounter || tokenCounter === 0) {
            setCardCount(tokenCounter);
          }
          setMyNFTs(nfts);
          setTotalCards(tokenCounter);
          setLoading(false);
          setCardsCounter(false);
        });
    }
    fetchMyNfts();
  }, [userAddress, hash, CardsCounter]);

  window.addEventListener("scroll", async function () {
    var root;
    root = document.querySelector(".market_place")?.getBoundingClientRect();
    if (root?.top + root?.height - this.window.innerHeight - 1400 < 0) {
      setLoading(true);
      setCardCount((prevState) => prevState + 50);
      setCardsCounter(true);
    }
  });

  return (
    <>
      <Container>
        {/* <div className='profile_section'> */}
        <div className="row">
          <div className="spacer-double"></div>
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <div className="Image" />
                  {/* <img src="http://134.209.110.122:1337/uploads/author_1_6f9ad9e11a.jpg" alt="image"> */}
                  <img src={api.baseUrl} alt="" />
                  <i className="fa fa-check"> </i>
                  <div className="profile_name">
                    <h4>
                      Monica Lucas
                      <span className="profile_username">@monicaaa</span>
                      <span id="wallet" className="profile_wallet">
                        {userAddress}
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        Copy
                      </button>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">500 Followers</div>
                </div>
                <div className="de-flex-col">
                  <span className="btn-main">Follow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav text-left">
                <li id="Mainbtn" className="active">
                  <a>
                    <span>On Sale</span>
                  </a>
                </li>
                <li id="Mainbtn1" className="">
                  <span>Created</span>
                </li>
                <li id="Mainbtn2" className="">
                  <span>Liked</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h5 className="text-center mb-5">Wallet Address</h5>
        {userAddress && (
          <div className="_user__id">
            <p onClick={setCopied}>
              {userAddress}{" "}
              <span>
                <FiCopy />
              </span>
            </p>
            <div className="toolt">{isCopied ? "Copied" : "Copy"}</div>
          </div>
        )}
      </Container>
      <div
        className={
          !allCardsLoaded && !loading ? "market_place dashboard" : "dashboard"
        }
      >
        <div className="section_info">
          {/* <p className="section_small_heading">NFTs</p> */}
          {/* <h1 className='section_heading'>My Collections</h1> */}
          <h1 style={{ color: "white" }}>My Collections</h1>
        </div>
        <Container>
          <Row>
            {myNFTs &&
              myNFTs.map((item) => (
                <Col xl={3} lg={3} md={6} sm={6} xs={6} className="mb-3">
                  <NFTCollection item={item} transID={setHash} />
                  {/* {NFTCollection({ item, setHash })} */}
                </Col>
              ))}
            {CardCount !== TotalCards && (
              <>
                {Array(10)
                  .fill(0, 0, 4)
                  .map((_) => (
                    <Col xl={3} lg={3} md={6} sm={6} xs={6} className="mb-3">
                      <div className="nft_card loading">
                        <div className="nft_card_image_wrapper">
                          <div className="nft_card_image skeleton"></div>
                          <div className="user_image skeleton"></div>
                        </div>
                        <h6 className="skeleton"></h6>
                        <h6 className="skeleton"></h6>
                        <div className="btn_loading skeleton"></div>
                      </div>
                    </Col>
                  ))}
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
