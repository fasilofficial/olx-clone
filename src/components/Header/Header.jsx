import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  OlxLogo,
  Search,
  Arrow,
  SellButtonPlus,
  SellButton,
} from "../../assets";
import "./Header.css";
import { Link } from "react-router-dom";
import { authContext, firebaseContext } from "../../store/Context";

const Header = () => {
  const navigate = useNavigate();

  const handleSellClick = () => {
    navigate("/create");
  };

  const { user } = useContext(authContext);
  const { firebase } = useContext(firebaseContext);

  const handleSignout = () => {
    firebase.auth().signOut();
    navigate("/login");
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/">
            <OlxLogo />
          </Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <p>{user.displayName}</p>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>
        <div className="sellMenu" onClick={handleSellClick}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        {user && (
          <p className="link" onClick={handleSignout}>
            Logout
          </p>
        )}
      </div>
    </div>
  );
};

export default Header;
