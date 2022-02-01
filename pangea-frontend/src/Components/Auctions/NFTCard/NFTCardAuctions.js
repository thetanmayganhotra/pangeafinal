import { Image } from "react-bootstrap";
// import {NFTCardProps} from '../../MarketPlace/NFTCard/NFTCard.d'
import { ReactComponent as BsFillHandbagFill } from "../../../Assets/react-icons/BsFillHandbagFill.svg";

// svg
import { useEffect, useState } from "react";
// import image from '../../../Assets/nft/nft__img.jpg'
import { Link } from "react-router-dom";
// redux imports
import { useSelector, useDispatch } from "react-redux";
import { getNftType } from "../../../Redux/Profile/actions";
// import CountDown from '../../Countdown/CountDown'
import getContracts from "../../../Redux/Blockchain/contracts";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import WalletsPopup from '../../Modals/WalletsPopup/WalletsPopup'
// import DisConnect from '../../Modals/DisConnect/DisConnect'

const NFTCardAuctions = ({ item }) => {
  const { walletType, networkID, userAddress } = useSelector(
    (state) => state.profile
  );
  const cld = new Cloudinary({
    cloud: {
      cloudName: "thepangea",
    },
  });

  // Use the image with public ID, 'docs/colored_pencils'.
  let myImage;
  if (networkID === "4") myImage = cld.image("thepangea/" + item.id);
  else if (networkID === "97") myImage = cld.image("thepangeaBin/" + item.id);
  else myImage = cld.image("thepangeaPoly/" + item.id);
  // const myImage = cld.image("thepangea/" + item.id);
  myImage.resize(thumbnail().width(350).gravity(focusOn(FocusOn.face())));

  // redux state
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(0);
  console.log(item);
  useEffect(() => {
    const getNFtCountdown = async () => {
      const { auction } = getContracts(walletType, networkID);
      if (auction) {
        try {
          const transaction = await auction.methods
            .timeLeftForAuctionToEnd(item?.id)
            .call();
          setTime(transaction);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getNFtCountdown();
  }, [item]);

  useEffect(() => {
    if (time?.timeleft > 0) {
      setDone(false);
    }
  }, [time]);

  return (
    <>
      <Link
        to={{
          pathname: `/auction/${item.auctionId}`,
          state: { message: item.id },
        }}
      >
        <div className="nft_card">
          {/* {!done && time?.timeleft > 0 && (
          <CountDown timeInMilisecs={time?.timeleft * 1000} setDone={setDone} />
        )} */}
          <div className="nft_card_image_wrapper">
            <div className="nft_card_image">
              <AdvancedImage cldImg={myImage}></AdvancedImage>
            </div>
            <div className="user_image">
              <AdvancedImage cldImg={myImage}></AdvancedImage>
            </div>
          </div>
          <h6 title={item?.name}>{item?.name}</h6>
          {/* <h6>{item?.price} ETH</h6> */}
          <div>
            <button
              onClick={() => dispatch(getNftType(1))}
              className="btn_brand btn_outlined"
            >
              <BsFillHandbagFill />
              Place a Bid
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NFTCardAuctions;
