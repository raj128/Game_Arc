import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Header.css";

const Header = ({
  isAdmin,
  setAddGame,
  setIsFavourite,
  setLoggedIn,
  loggedIn,
  categories,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  setShowLoginModal,
}) => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [localsearchTerm, setLocalSearchTerm] = useState("");
  const [local, setLocal] = useState("Categories");
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const handleLocal = (category) => {
    setLocal(category);
  };

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setLocalSearchTerm(newSearchTerm);
    setSearchTerm(newSearchTerm);
  };
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };
  const handleFav = (val) => {
    if (loggedIn) {
      setIsFavourite(val);
    } else {
      if(val)
      alert("Please log in to access favourites.");
    }
  };
  const handleLogout = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/auth/logout');
      if (response.data.success === true) {
        setLoggedIn(false); 
      } else {
        // Handle other response statuses or error cases
      }
    } catch (error) {
      // Handle error
      console.error('Error logout user:', error);
    }
    
  };

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            GAMEARC
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" onClick={() => handleFav(true)}>
                  Favourites
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {local}
                </a>
                <ul className="dropdown-menu">
                  <li key={0}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => {
                        handleCategorySelect("all");
                        handleLocal("Categories");
                        handleFav(false);
                      }}
                    >
                      ALL
                    </a>
                  </li>
                  {categories.map((category, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          handleCategorySelect(category);
                          handleLocal(category);
                          handleFav(false);
                        }}
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              {isAdmin && loggedIn && (
                <li className="nav-item">
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => setAddGame(true)}
                  >
                    Add Game
                  </button>
                </li>
              )}
            </ul>
            
            <div className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search games..."
                value={localsearchTerm}
                onChange={handleSearch}
              />
            </div>
            {loggedIn ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                LOGOUT
              </button>
            ) : (
              <button
                className="btn btn-outline-success ms-2 ps-3 pe-3"
                onClick={handleLoginClick}
              >
                LOG IN
              </button>
            )}

            {/* <button className="btn btn-outline-danger ms-2 ps-3 pe-3">LOG OUT</button> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
