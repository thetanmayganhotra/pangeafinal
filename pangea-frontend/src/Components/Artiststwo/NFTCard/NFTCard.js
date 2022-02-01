import { Image } from "react-bootstrap";

// import {BsFillHandbagFill} from 'react-icons/bs'

// svg
// import image from '../../../Assets/nft/nft__img.jpg'
// import {Link} from 'react-router-dom'
// // redux imports
// import {useSelector, useDispatch} from 'react-redux'
// import {getNftType} from '../../../Redux/Profile/actions'
// import {useEffect, useState} from 'react'

const NFTCard = ({ item }) => {
  // redux state

  return (
    <>
      <div className="nft_card">
        <div className="nft_card_image_wrapper">
          <div className="nft_card_image">
            <Image src={item?.image} alt="" />
          </div>
          <div className="user_image">
            <Image src={item?.image} alt="" />
          </div>
        </div>
        <h6 title={item?.name}>{item?.name}</h6>
        {/* <h6>{item?.price} ETH</h6> */}
        {/* <div>
        <Link to={`/nft/${item.id}`}>
          <button
            onClick={() => dispatch(getNftType(0))}
            className="btn_brand btn_outlined"
          >
            <BsFillHandbagFill />
            Buy now
          </button>
        </Link>
      </div> */}
      </div>
    </>
  );
};

export default NFTCard;
