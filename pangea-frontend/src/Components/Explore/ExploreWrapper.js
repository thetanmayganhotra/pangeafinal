import { Container, Row, Col } from "react-bootstrap";
// import NFTCard from '../NFTCard/NFTCard'
// import {v4 as uuid} from 'uuid'
// import {getAllNFTS} from '../../../Redux/MarketPlace/actions'

// // svg
// import image from '../../../Assets/nft/nft__img.jpg'

// redux imports
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import getContracts from "../../Redux/Blockchain/contracts";
import MarketCard from "./NFTCard/MarketCard";
import axios from "axios";
import CreateNft from "../../Pages/CreateNft";

const ExploreWrapper = () => {
  // redux state
  const { walletType, userAddress, profileLoading, networkID } = useSelector(
    (state) => state.profile
  );
  const [category, setCategory] = useState("All");
  // const [marketItems, setmarketItems] = useState([])
  const [metadata, setmetadata] = useState([]);
  const {
    web3,
    marketPlace,
    createNFT,
    auction,
    marketAddress,
    auctionAddress,
    createAddress,
  } = getContracts(walletType, networkID);
  const [CardCount, setCardCount] = useState(16);
  const [loading, setLoading] = useState(false);
  const [allCardsLoaded, setallCardsLoaded] = useState(false);
  const [CardsCounter, setCardsCounter] = useState(false);
  const [firstLoader, setfirstLoader] = useState(true);
  const [Duplicacy, setDuplicacy] = useState(0);
  const [CurrentLoader, setCurrentLoader] = useState("Market");
  const [TotalCards, setTotalCards] = useState(-1);

  // const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(getAllNFTS())
    async function fetchItems() {
      try {
        setLoading(true);
        var items = await marketPlace.methods
          .fetchMarketItems()
          .call()
          .then(async (items) => {
            var metadataArray = metadata;
            if (Duplicacy == CardCount || Duplicacy > CardCount) {
              setLoading(false);
              setCardsCounter(false);
              return console.log("returning");
            } else {
              setDuplicacy(CardCount);
            }
            var dummyCardCount = CardCount;
            var dummyInitialCount = CardCount - 16;
            if (CurrentLoader === "Market" && dummyCardCount > items.length) {
              dummyCardCount = items.length;
              setCurrentLoader("Auction");
            } else if (dummyCardCount === items.length || items.length === 0) {
              dummyCardCount = items.length;
              setCurrentLoader("Auction");
            }

            if (CurrentLoader === "Market") {
              for (
                let i = items.length - dummyInitialCount - 1;
                i >= items.length - dummyCardCount;
                --i
              ) {
                try {
                  var uri = await createNFT.methods
                    .tokenURI(items[i].tokenId)
                    .call();
                  var response = await axios.get(uri);
                  var data = response.data;
                  data.price = web3.utils.fromWei(items[i].price, "ether");
                  data.id = items[i].itemId;
                  data.saleId = items[i].tokenId;
                  metadataArray.push(data);
                } catch (error) {
                  console.log(error, "this is the issue");
                }
              }
            } else {
              if (firstLoader) {
                var dummyCardCount = 16;
                var dummyInitialCount = 0;
                setfirstLoader(false);
              }
              var nfts = await auction.methods
                .fetchUnsoldAuctions()
                .call()
                .then(async (nfts) => {
                  if (dummyCardCount > nfts.length) {
                    dummyCardCount = nfts.length;
                    setallCardsLoaded(true);
                  } else if (
                    dummyCardCount === nfts.length ||
                    nfts.length === 0
                  ) {
                    setallCardsLoaded(true);
                  }

                  for (
                    let i = nfts.length - dummyInitialCount - 1;
                    i >= nfts.length - dummyCardCount;
                    --i
                  ) {
                    var uri = await createNFT.methods
                      .tokenURI(nfts[i].tokenId)
                      .call();
                    var response = await axios.get(uri);
                    var item = response.data;
                    item.highestBid = nfts[i].amount;
                    item.highestBidder = nfts[i].bidder;
                    item.price =
                      nfts[i].amount > 0
                        ? web3.utils.fromWei(nfts[i].amount.toString(), "ether")
                        : web3.utils.fromWei(
                            nfts[i].reservePrice.toString(),
                            "ether"
                          );
                    item.id = nfts[i].tokenId;
                    item.saleId = nfts[i].tokenId;
                    item.auctionId = nfts[i].auctionId;
                    metadataArray.push(item);
                  }
                  setTotalCards(nfts.length + items.length);
                });
            }

            setmetadata(metadataArray);
            setLoading(false);
            setCardsCounter(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
        setCardsCounter(false);
      }
    }
    fetchItems();
  }, [category, CardsCounter]);

  window.addEventListener("scroll", async function () {
    var root;
    root = document.querySelector(".market_place")?.getBoundingClientRect();
    if (root?.top + root?.height - this.window.innerHeight - 1400 < 0) {
      setCardCount((prevState) => prevState + 16);
      setCardsCounter(true);
    }
  });

  return (
    <div className={!allCardsLoaded && !loading ? "market_place" : ""}>
      <div className="section_info">
        {/* <p className="section_small_heading">Exclusive Assets</p> */}
        {/* <h1 className='section_heading'>Explore</h1> */}
        {/* <h1 style={{ color: "white" }}>Explore</h1> */}
      </div>
      <Container>
        <Row>
          {/* <div className='filters'>
            <div
              className='filter_wrapper'
              onClick={(event) => {
                event.preventDefault()
                setCategory('All')
              }}
            >
              <p>All</p>
            </div>
            <div
              className='filter_wrapper'
              onClick={(event) => {
                event.preventDefault()
                setCategory('Funny')
              }}
            >
              <p>Funny</p>
            </div>
            <div
              className='filter_wrapper'
              onClick={(event) => {
                event.preventDefault()
                setCategory('Art')
              }}
            >
              <p>Art</p>
            </div>
            <div
              className='filter_wrapper'
              onClick={(event) => {
                event.preventDefault()
                setCategory('Nature')
              }}
            >
              <p>Nature</p>
            </div>
            <div
              className='filter_wrapper'
              onClick={(event) => {
                event.preventDefault()
                setCategory('Animal')
              }}
            >
              <p>Animal</p>
            </div>
            <div
              className='filter_wrapper'
              onClick={(event) => {
                event.preventDefault()
                setCategory('Sports')
              }}
            >
              <p>Sports</p>
            </div>
            <div
              className='filter_wrapper'
              onClick={(event) => {
                event.preventDefault()
                setCategory('Photography')
              }}
            >
              <p>Photography</p>
            </div>
            <div
              className='filter_wrapper'
              onClick={(event) => {
                event.preventDefault()
                setCategory('Music')
              }}
            >
              <p>Music</p>
            </div>
            <div
              className='filter_wrapper'
              onClick={(event) => {
                event.preventDefault()
                setCategory('Metaverse')
              }}
            >
              <p>Metaverse</p>
            </div>
          </div> */}

          {metadata &&
            metadata.map((item) => (
              <Col
                xl={3}
                lg={3}
                md={6}
                sm={6}
                xs={6}
                className="mb-3"
                key={item.id}
              >
                <MarketCard item={item} />
                {/* {MarketCard({ item })} */}
              </Col>
            ))}
          {metadata.length !== TotalCards && (
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
  );
};

export default ExploreWrapper;
