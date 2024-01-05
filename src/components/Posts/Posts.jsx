import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Posts.css";
import { firebaseContext } from "../../store/Context";
import { postContext } from "../../store/PostContext";
import { Heart } from "../../assets";

const Posts = () => {
  const [products, setProducts] = useState([]);

  const { firebase } = useContext(firebaseContext);
  const { setPostDetails } = useContext(postContext);

  const navigate = useNavigate();

  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const allPosts = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allPosts);
      });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="postChildDiv">
        <div className="heading">
          <span>Fresh Recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="card"
                onClick={() => {
                  setPostDetails(product);
                  navigate("/view");
                }}
              >
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.imgUrl} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.name}</span>
                  <p className="name">{product.category}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Posts;
