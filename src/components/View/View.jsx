import React, { useState, useEffect, useContext } from "react";
import "./View.css";
import { postContext } from "../../store/PostContext";
import { firebaseContext } from "../../store/Context";

const View = () => {
  const [userDetails, setUserDetails] = useState([]);
  const { postDetails } = useContext(postContext);
  const { firebase } = useContext(firebaseContext);

  useEffect(() => {
    const { userId } = postDetails;
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", userId)
      .get()
      .then((res) => res.forEach((doc) => setUserDetails(doc.data())));
  }, []);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imgUrl} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <h2>{postDetails.name}</h2>
          <h3>{postDetails.category}</h3>
          <hr />
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails ? (
          <div className="contactDetails">
            <p>Seller Details</p>
            <p>Name: {userDetails.username}</p>
            <p>Phone: {userDetails.phone}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default View;
