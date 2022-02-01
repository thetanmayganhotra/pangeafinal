import { Container, Row, Col } from "react-bootstrap";
// import NFTCard from '../NFTCard/NFTCard'
// import {v4 as uuid} from 'uuid'
// import {getAllNFTS} from '../../../Redux/MarketPlace/actions'

// // svg
// import image from '../../../Assets/nft/nft__img.jpg'

// redux imports
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import getContracts from "../../../Redux/Blockchain/contracts";
import MarketCard from "../NFTCard/MarketCard";
import axios from "axios";
import { createNFTAddressE } from "../../../Redux/Blockchain/Ethereum/createNFT";
import { createNFTAddressP } from "../../../Redux/Blockchain/Polygon/createNFT";
import { createNFTAddressB } from "../../../Redux/Blockchain/Binance/createNFT";

const MainWrapper = () => {
  // redux state
  const { walletType, userAddress, profileLoading, networkID } = useSelector(
    (state) => state.profile
  );
  const [category, setCategory] = useState("All");
  // const [marketItems, setmarketItems] = useState([])
  const [metadata, setmetadata] = useState([]);
  const { web3, openToBids, createNFT, auction } = getContracts(
    walletType,
    networkID
  );
  const [CardCount, setCardCount] = useState(16);
  const [loading, setLoading] = useState(false);
  const [allCardsLoaded, setallCardsLoaded] = useState(false);
  const [CardsCounter, setCardsCounter] = useState(false);
  const [Duplicacy, setDuplicacy] = useState(0);
  const [TotalCards, setTotalCards] = useState(-1);
  // const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(getAllNFTS())
    async function fetchItems() {
      try {
        setLoading(true);
        var items = await openToBids.methods
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
            if (dummyCardCount > items.length) {
              dummyCardCount = items.length;
              setallCardsLoaded(true);
            } else if (dummyCardCount == items.length || items.length == 0) {
              setallCardsLoaded(true);
            }
            for (
              let i = items.length - dummyInitialCount - 1;
              i >= items.length - dummyCardCount;
              --i
            ) {
              if (
                items[i].nftContract.toLowerCase() ==
                  createNFTAddressE.toLowerCase() ||
                items[i].nftContract.toLowerCase() ==
                  createNFTAddressB.toLowerCase() ||
                items[i].nftContract.toLowerCase() ==
                  createNFTAddressP.toLowerCase()
              ) {
                console.log(items[i]);
                try {
                  var uri = await createNFT.methods
                    .tokenURI(items[i].tokenId)
                    .call();
                  var response = await axios.get(uri);
                  var data = response.data;
                  data.highestBid = web3.utils.fromWei(
                    items[i].highestBid,
                    "ether"
                  );
                  data.id = items[i].itemId;
                  data.saleId = items[i].tokenId;
                  if (category !== "All") {
                    if (
                      category.toLowerCase() == data.category?.toLowerCase()
                    ) {
                      metadataArray.push(data);
                    }
                  } else {
                    metadataArray.push(data);
                  }
                } catch (error) {
                  console.log(error, "this is error");
                }
              }
            }
            setmetadata(metadataArray);
            setTotalCards(items.length);
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

export default MainWrapper;
