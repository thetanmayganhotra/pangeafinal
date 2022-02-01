import { Image } from "react-bootstrap";
// import {NFTCardProps} from './NFTCard.d'
import { ReactComponent as BsFillHandbagFill } from "../../../Assets/react-icons/BsFillHandbagFill.svg";

// svg
// import image from '../../../Assets/nft/nft__img.jpg'
import { Link } from "react-router-dom";
// redux imports
import { useSelector, useDispatch } from "react-redux";
import { getNftType } from "../../../Redux/Profile/actions";
import getContracts from "../../../Redux/Blockchain/contracts";
import { numberFormate } from "../../../Utilities/Util";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import WalletsPopup from '../../Modals/WalletsPopup/WalletsPopup'
// import DisConnect from '../../Modals/DisConnect/DisConnect'
// import {useEffect, useState} from 'react'

const MarketCard = ({ item }) => {
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
  if (networkID === "4") myImage = cld.image("thepangea/" + item.saleId);
  else if (networkID === "97")
    myImage = cld.image("thepangeaBin/" + item.saleId);
  else myImage = cld.image("thepangeaPoly/" + item.saleId);
  // const myImage = cld.image("thepangea/" + item.saleId);
  myImage.resize(thumbnail().width(350).gravity(focusOn(FocusOn.face())));

  // redux state

  const { web3, marketPlace, auction, createNFT } = getContracts(
    walletType,
    networkID
  );
  const dispatch = useDispatch();

  return (
    <>
      <Link
        to={{
          pathname: !item.auctionId
            ? `/nft/${item.id}`
            : `/auction/${item.auctionId}`,
          state: { message: item.saleId },
        }}
      >
        <div className="nft_card">
          <div className="nft_card_image_wrapper">
            <div className="nft_card_image">
              <AdvancedImage cldImg={myImage}></AdvancedImage>
            </div>
            <div className="user_image">
              <AdvancedImage cldImg={myImage}></AdvancedImage>
            </div>
          </div>
          <h6 title={item.name}>{item.name}</h6>
          <h6>{numberFormate(item ? item?.price : 0)} ETH</h6>
          <div>
            <button
              onClick={() => dispatch(getNftType(0))}
              className="btn_brand btn_outlined"
            >
              <BsFillHandbagFill />
              {!item.auctionId ? "Buy now" : "Place Bid"}
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MarketCard;

//marketplace calls all items in all contracts
