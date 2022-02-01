import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import getContracts from "../../Redux/Blockchain/contracts";

import axios from "axios";

// svg
import NFTCardAuctions from "./NFTCard/NFTCardAuctions";
import { createNFTAddressE } from "../../Redux/Blockchain/Ethereum/createNFT";
import { createNFTAddressB } from "../../Redux/Blockchain/Binance/createNFT";
import { createNFTAddressP } from "../../Redux/Blockchain/Polygon/createNFT";

const AuctionsWrapper = () => {
  const { walletType, userAddress, profileLoading, networkID } = useSelector(
    (state) => state.profile
  );
  const { web3, marketPlace, auction, createNFT } = getContracts(
    walletType,
    networkID
  );

  const [auctionNFTs, setauctionNFTs] = useState([]);
  const [CardCount, setCardCount] = useState(16);
  const [loading, setLoading] = useState(false);
  const [allCardsLoaded, setallCardsLoaded] = useState(false);
  const [CardsCounter, setCardsCounter] = useState(false);
  const [Duplicacy, setDuplicacy] = useState(0);
  const [TotalCards, setTotalCards] = useState(-1);

  useEffect(() => {
    async function fetchAuctionNFTs() {
      setLoading(true);
      try {
        var nfts = await auction.methods
          .fetchUnsoldAuctions()
          .call()
          .then(async (nfts) => {
            var items = auctionNFTs;
            if (Duplicacy == CardCount || Duplicacy > CardCount) {
              setLoading(false);
              setCardsCounter(false);
              return console.log("returning");
            } else {
              setDuplicacy(CardCount);
            }
            var dummyCardCount = CardCount;
            var dummyInitialCount = CardCount - 16;
            if (dummyCardCount > nfts.length) {
              dummyCardCount = nfts.length;
              setallCardsLoaded(true);
            } else if (dummyCardCount === nfts.length || nfts.length === 0) {
              dummyCardCount = nfts.length;
              setallCardsLoaded(true);
            }
            for (
              let i = nfts.length - dummyInitialCount - 1;
              i >= nfts.length - dummyCardCount;
              --i
            ) {
              if (
                nfts[i].nftContract.toLowerCase() ===
                  createNFTAddressE.toLowerCase() ||
                nfts[i].nftContract.toLowerCase() ===
                  createNFTAddressB.toLowerCase() ||
                nfts[i].nftContract.toLowerCase() ===
                  createNFTAddressP.toLowerCase()
              ) {
                try {
                  var uri = await createNFT.methods
                    .tokenURI(nfts[i].tokenId)
                    .call();
                  var response = await axios.get(uri);
                  var item = response.data;
                  item.highestBid = nfts[i].amount;
                  item.highestBidder = nfts[i].bidder;
                  item.id = nfts[i].tokenId;
                  item.auctionId = nfts[i].auctionId;
                  items.push(item);
                } catch (error) {
                  console.log(error, "error message");
                }
              }
            }

            setauctionNFTs(items);
            setTotalCards(nfts.length);
            setLoading(false);
            setCardsCounter(false);
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
        setCardsCounter(false);
      }
    }

    fetchAuctionNFTs();
  }, [userAddress, CardsCounter]);

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
        {/* <p className='section_small_heading'>Exclusive Assets</p> */}
        {/* <h1 className='section_heading'>Explore</h1> */}
        {/* <h1 style={{ color: "white" }}>Explore</h1> */}
      </div>
      <Container>
        <Row>
          {auctionNFTs &&
            auctionNFTs.map((item) => (
              <Col
                xl={3}
                lg={3}
                md={6}
                sm={6}
                xs={6}
                className="mb-3"
                key={item?.id}
              >
                <NFTCardAuctions item={item} />
              </Col>
            ))}
          {auctionNFTs.length !== TotalCards && (
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

export default AuctionsWrapper;
