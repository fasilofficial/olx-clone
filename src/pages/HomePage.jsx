import React from "react";
import { Header, Banner, Posts, Footer } from "../components";

const HomePage = () => {
  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
};

export default HomePage;
