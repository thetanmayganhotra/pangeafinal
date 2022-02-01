import { Container, Row, Image, Col, Form } from "react-bootstrap";
// import NumberFormat from 'react-number-format'
import React, { useEffect, useState } from "react";
import UploadField from "../UploadField";
import { useSelector } from "react-redux";
// img
// import PrevIMg from '../../../Assets/nft/pre_img.jpg'
import NFTCreateLoading from "../../Modals/NFTCreateLoading/NFTCreateLoading";
import NFTCreateSuccess from "../../Modals/NFTCreateSuccess/NFTCreateSuccess";
import DefaultModal from "../../Modals/DefaultModal/DefaultModal";
// import {setTimeout} from 'timers'
import axios from "axios";
import getContracts from "../../../Redux/Blockchain/contracts";
import Attributes from "../../Modals/Attributes/Attributes";

// import mintingContract from '../../../contracts/minting'

const AddForm = () => {
  // redux State
  const { walletType, userAddress, profileLoading, nftCardType, networkID } =
    useSelector((state) => state.profile);
  // const { userAddress } = useSelector((state) => state.profile)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [price, setPrice] = useState<number | string>('')
  const [imageSrc, setImageSrc] = useState([]);
  const [royalty, setRoyalty] = useState("");
  const [category, setCategory] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [error, setError] = useState(false);
  const [royaltyError, setRoyaltyError] = useState(false);
  const { createNFT } = getContracts(walletType, networkID);
  // Modals
  const [nftLoading, setNftLoading] = useState(false);
  const [nftSuccess, setNftSuccess] = useState(false);
  const [attributeModal, setAttributeModal] = useState(false);
  const [hash, setHash] = useState("");
  const [inputFieldsList, setInputFieldsList] = useState([
    {
      propertyType: "",
      propertyName: "",
    },
  ]);

  const closeAttributeModal = () => {
    setAttributeModal(false);
  };

  useEffect(() => {
    if (title?.length > 0 && imageSrc.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [title, userAddress, imageSrc]);

  const clearValue = () => {
    setTitle("");
    setDescription("");
    setImageSrc([]);
    setRoyalty("");
  };

  const handleCategories = (e) => {
    setCategory(e.target.value);
  };

  const submitNFTForm = async (e) => {
    e.preventDefault();
    setNftLoading(true);

    let formData = new FormData();
    formData.append("name", title);
    formData.append("royalty", royalty + "");
    formData.append("image", imageSrc[0]);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("collection", collectionName);
    formData.append("attributes", JSON.stringify(inputFieldsList));

    let axiosConfig = {
      headers: {
        "Content-Type":
          "multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      },
    };

    const response = await axios.post(
      "http://localhost:5000/pinata_upload",
      formData,
      axiosConfig
    );
    var tokenHash = response.data;
    var tokenUri = "https://thepangea.mypinata.cloud/ipfs/" + tokenHash;
    try {
      var tokenCounter = await createNFT.methods.getTokenCounter().call();
      const res = await createNFT.methods
        .batchMint([tokenUri], [royalty])
        .send({ from: userAddress });
      if (res?.transactionHash) {
        let cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", imageSrc[0]);
        if (networkID == "4")
          cloudinaryFormData.append("upload_preset", "thepangea");
        else if (networkID == "97")
          cloudinaryFormData.append("upload_preset", "thepangeaBin");
        else cloudinaryFormData.append("upload_preset", "thepangeaPoly");
        // cloudinaryFormData.append("invalidate", true);
        cloudinaryFormData.append("public_id", tokenCounter);
        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/thepangea/image/upload/",
          {
            method: "POST",
            body: cloudinaryFormData,
          }
        );

        const JSONdata = await cloudinaryRes.json();

        setHash(res?.transactionHash);
        setNftLoading(false);
        setNftSuccess(true);
        clearValue();
      }
    } catch (error) {
      console.log(error);
      setNftLoading(false);
    }
  };

  const handlePriceChange = (e) => {
    const reg = /^[0-9-+()]*$/;
    if (reg.test(e.target.value)) {
      setRoyalty(e.target.value);
    }
  };

  useEffect(() => {
    if (Number(royalty) < 100 && royalty !== "") {
      setRoyaltyError(false);
    } else {
      setRoyaltyError(true);
    }
  }, [royalty]);

  const addInputField = () => {
    setInputFieldsList([
      ...inputFieldsList,
      {
        propertyType: "",
        propertyName: "",
      },
    ]);
  };
  const removeInputField = (index) => {
    const list = [...inputFieldsList];
    list.splice(index, 1);
    setInputFieldsList(list);
  };
  const handleAttributeChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputFieldsList];
    list[index][name] = value;
    setInputFieldsList(list);
  };

  return (
    <>
      <div className="add_nft">
        <hr />
        <Container style={{ padding: "50px 0 0 0" }}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={8} xl={8} className="mb-3">
              <div className="add_nft__right">
                <Form onSubmit={(e) => submitNFTForm(e)}>
                  <Form.Group className="mb-3">
                    <h5 style={{ color: "white" }}>Upload File</h5>
                    {/* <Form.Label>Upload File</Form.Label> */}
                    <UploadField setImageSrc={setImageSrc} profile={false} />
                    {/* <input
                type="file"
                id="fileInput"
                accept="image/*"
                // style={{ display: "none" }}
                onChange={(e) => setImageSrc(e.target.files)}
              /> */}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    {/* <Form.Label>Title</Form.Label> */}
                    <h5 className="hsix_font_size" style={{ color: "white" }}>
                      Title
                    </h5>
                    <Form.Control
                      type="text"
                      placeholder="Pinky Ocean"
                      className="shadow-none form-control"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      size="lg"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    {/* <Form.Label>Description (Optional)</Form.Label> */}
                    <h5 className="hsix_font_size" style={{ color: "white" }}>
                      Description (Optional)
                    </h5>
                    <Form.Control
                      type="text"
                      placeholder="e.g. `raroin design art"
                      className="shadow-none form-control"
                      name="description"
                      size="lg"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    {/* <Form.Label>Collection Name (Optional)</Form.Label> */}
                    <h5 className="hsix_font_size" style={{ color: "white" }}>
                      Collection Name (Optional)
                    </h5>
                    <Form.Control
                      type="text"
                      placeholder="Crazy NFTs"
                      className="shadow-none form-control"
                      name="title"
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                      size="lg"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    {/* <Form.Label>Category</Form.Label> */}
                    <h5 className="hsix_font_size" style={{ color: "white" }}>
                      Category
                    </h5>
                    <select
                      className="shadow-none form-control"
                      onChange={(e) => handleCategories(e)}
                    >
                      <option hidden={true}>Select Category</option>
                      <option value="funny">Funny</option>
                      <option value="art">Art</option>
                      <option value="nature">Nature</option>
                      <option value="animal">Animal</option>
                      <option value="sports">Sports</option>
                      <option value="photography">Photography</option>
                      <option value="music">Music</option>
                      <option value="metaverse">Metaverse</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    {/* <Form.Label>Royalty %</Form.Label> */}
                    <h5 className="hsix_font_size" style={{ color: "white" }}>
                      Royalty %
                    </h5>
                    {/* <NumberFormat
                      disabled={false}
                      thousandsGroupStyle='thousand'
                      value={royalty}
                      displayType='input'
                      type='text'
                      thousandSeparator={true}
                      allowNegative={false}
                      fixedDecimalScale={false}
                      allowLeadingZeros={false}
                      onValueChange={handlePriceChange}
                      placeholder='0 - 99 %'
                      className='shadow-none form-control'
                      name='royalty'
                    /> */}
                    <Form.Control
                      type="tel"
                      placeholder="0 - 99 %"
                      className="shadow-none form-control"
                      size="lg"
                      value={royalty}
                      onChange={(e) => handlePriceChange(e)}
                    />
                    {/* <p style={{fontSize: '10px'}}>
                      Royalty Should be between 0 - 99 %
                    </p> */}
                    {royaltyError && (
                      <span>Royalty Should be between 0 - 99 %</span>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <a
                      href="javascript:void(0)"
                      className="btn_brand change_color_red"
                      onClick={() => setAttributeModal(true)}
                    >
                      Add Attributes
                    </a>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <button
                      type="submit"
                      disabled={error || royaltyError}
                      className={
                        error || royaltyError
                          ? "btn_brand btn_brand_disabled change_color_red"
                          : "btn_brand"
                      }
                    >
                      Create
                    </button>
                  </Form.Group>
                </Form>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mb-3">
              <div className="add_nft__left">
                <h5>Preview item</h5>
                <div className="preview_card">
                  <div className="prevImg">
                    {imageSrc.length > 0 && (
                      <Image
                        src={
                          imageSrc.length > 0
                            ? URL.createObjectURL(imageSrc[0])
                            : ""
                        }
                        alt=""
                      />
                    )}
                  </div>
                  <h5>
                    {title?.length > 0
                      ? title
                      : "Upload file to preview your brand new NFT"}
                  </h5>
                  {/* <h5>{price > 0 ? price : '00.00'} ETH</h5> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
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
          <NFTCreateSuccess title={false} hash={hash} />
        </DefaultModal>
        <DefaultModal
          show={attributeModal}
          handleClose={() => setAttributeModal(false)}
          type="success"
          title="Add Properties"
        >
          <Attributes
            inputFilesList={inputFieldsList}
            addInputField={addInputField}
            removeInputField={removeInputField}
            closeAttributeModal={closeAttributeModal}
            handleAttributeChange={handleAttributeChange}
          />
        </DefaultModal>
      </div>
    </>
  );
};

export default AddForm;
