import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import GameList from "./GameList";
import Favourites from "./Favourites";
const Home = ({loggedIn, isFavourite,selectedCategory, searchTerm }) => {
  return (
    <>
      <div className="margin"></div>
      <div className="main-container">
        {isFavourite ? (
          <Favourites loggedIn={loggedIn} searchTerm={searchTerm} />
        ) : (
          <GameList loggedIn={loggedIn} selectedCategory={selectedCategory} searchTerm={searchTerm} />
        )}

        
        <div className="footer">
          <h1>ALL RIGHTS RESERVED </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
