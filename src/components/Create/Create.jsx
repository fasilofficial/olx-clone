import React, { useContext, useEffect, useState } from "react";
import { Header } from "../";
import "./Create.css";
import { authContext, firebaseContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    setNameError("");
  }, [name]);
  useEffect(() => {
    setCategoryError("");
  }, [category]);
  useEffect(() => {
    setPriceError("");
  }, [price]);
  useEffect(() => {
    setImageError("");
  }, [image]);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!category) {
      setCategoryError("Category is required");
      isValid = false;
    }
    if (!price) {
      setPriceError("Price is required");
      isValid = false;
    }
    if (!image) {
      setImageError("Image is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      firebase
        .storage()
        .ref(`/images/${image.name}`)
        .put(image)
        .then(({ ref }) => {
          ref.getDownloadURL().then((url) => {
            console.log(url);
            firebase.firestore().collection("products").add({
              name,
              category,
              price,
              imgUrl: url,
              userId: user.uid,
              createdAt: new Date().toDateString(),
            });
            navigate("/");
          });
        });
    }
  };

  const { user } = useContext(authContext);
  const { firebase } = useContext(firebaseContext);

  return (
    <>
      <Header />
      <div>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="error">{nameError}</p>
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            placeholder="Enter product category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <p className="error">{categoryError}</p>
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="price"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p className="error">{priceError}</p>
          <br />
          <br />
          {image && (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={image ? URL.createObjectURL(image) : ""}
            />
          )}
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <p className="error">{imageError}</p>
          <br />
          <button type="submit" onClick={handleSubmit} className="uploadBtn">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
