import { Image } from "react-bootstrap";
// import { NFTCardProps } from '../../MarketPlace/NFTCard/NFTCard.d'
// import {ReactComponent as BsFillHandbagFill} from "../../Assets/react-icons/BsFillHandbagFill.svg"
// import { AuctionCardProps } from './AuctionCard'
// svg
// import {useEffect, useState} from 'react'
// import image from '../../../Assets/nft/nft__img.jpg'
import { Link } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// redux imports
import { useDispatch } from "react-redux";
import { setAssetData } from "../../Redux/Profile/actions";
// import { getNftCountdown, getNftType } from '../../../Redux/Profile/actions'
// import CountDown from '../../Countdown/CountDown'
// import getContracts from '../../../Redux/Blockchain/contracts'
// import WalletsPopup from '../../Modals/WalletsPopup/WalletsPopup'
// import DisConnect from '../../Modals/DisConnect/DisConnect'

const ArtistCard = ({ item }) => {
  // const { walletType, networkID, userAddress } = useSelector(
  //   (state) => state.profile,
  // )
  const cld = new Cloudinary({
    cloud: {
      cloudName: "thepangea",
    },
  });

  // Use the image with public ID, 'docs/colored_pencils'.
  const myImage = cld.image("thepangea/" + item.id);
  myImage.resize(thumbnail().width(350).gravity(focusOn(FocusOn.face())));
  // // redux state
  const dispatch = useDispatch();
  // const [done, setDone] = useState(false)
  // const [time, setTime] = useState(0)

  // useEffect(() => {
  //   const getNFtCountdown = async () => {
  //     const { auction } = getContracts(walletType, networkID)
  //     if (auction) {
  //       try {
  //         const transaction = await auction.methods
  //           .timeLeftForAuctionToEnd(item?.id)
  //           .call()
  //         setTime(transaction)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   }
  //   getNFtCountdown()
  // }, [item])

  // useEffect(() => {
  //   if (time?.timeleft > 0) {
  //     setDone(false)
  //   }
  // }, [time])

  return (
    <>
      <div className="nft_card" onClick={() => dispatch(setAssetData(item))}>
        {/* {!done && time?.timeleft > 0 && (
          <CountDown timeInMilisecs={time?.timeleft * 1000} setDone={setDone} />
        )} */}
        <div className="nft_card_image_wrapper">
          <Link to="/nft-details">
            <div className="nft_card_image">
              <AdvancedImage cldImg={myImage}></AdvancedImage>
            </div>
          </Link>
          <Link to="/nft-details">
            <div className="user_image">
              <AdvancedImage cldImg={myImage}></AdvancedImage>
            </div>
          </Link>
        </div>
        <Link to="/nft-details">
          <h6 title={item?.name}>{item?.name}</h6>
        </Link>
        {/* <h6>{item?.price} ETH</h6> */}
        {/* <div>
          <Link to={`/auction/${item.auctionId}`}>
            <button
              onClick={() => dispatch(getNftType(1))}
              className="btn_brand btn_outlined"
            >
              <BsFillHandbagFill />
              Place a Bid
            </button>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default ArtistCard;
