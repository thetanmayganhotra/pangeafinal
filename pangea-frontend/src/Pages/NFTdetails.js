import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Container, Row, Image, Col } from "react-bootstrap";
import { ReactComponent as HiMenuAlt2 } from "../Assets/react-icons/HiMenuAlt2.svg";
import { useSelector } from "react-redux";
import getContracts from "../Redux/Blockchain/contracts";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

const NFTdetails = () => {
  const {
    walletType,
    assetInfo: item,
    userAddress,
    profileLoading,
    networkID,
  } = useSelector((state) => state.profile);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "thepangea",
    },
  });

  // Use the image with public ID, 'docs/colored_pencils'.
  const myImage = cld.image("thepangea/" + item.id);
  myImage.resize(thumbnail().width(1000).gravity(focusOn(FocusOn.face())));

  const [type, setType] = useState(null);
  const [price, setprice] = useState(null);
  const [duration, setduration] = useState(null);
  const [nftLoading, setNftLoading] = useState(false);
  const [nftSuccess, setNftSuccess] = useState(false);
  const [hash, setHash] = useState("");
  const [successTitle, setSuccessTitle] = useState("");
  const [popUpShow, setPopUpShow] = useState(false);
  const [owner, setOwner] = useState();
  const [minter, setMinter] = useState();

  const { web3, marketPlace, auction, createNFT } = getContracts(
    walletType,
    networkID
  );

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
                </div>

                {/* </div>  */}
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
    </>
  );
};

export default NFTdetails;
