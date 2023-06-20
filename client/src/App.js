import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Components/Home'
import Header from './Components/Header'
import LoginModal from './Components/LoginModal';
import GameForm from './Components/GameForm';
axios.defaults.withCredentials = true;
const App = () => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isAdmin,setIsAdmin]=useState(false);
  const [addGame, setAddGame] = useState(false);

  
  useEffect(() => {
    const fetchUniqueCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/games');
        const data = response.data;

        // Fetch unique categories
        const categoriesSet = new Set();
        data.forEach(game => {
          game.categories.forEach(category => {
            categoriesSet.add(category);
          });
        });
        const categoriesArray = Array.from(categoriesSet);
        setUniqueCategories(categoriesArray);
      } catch (error) {
        console.error('Error fetching unique categories:', error);
      }
    };

    fetchUniqueCategories();
  }, []);
  return (
    <div>
      <Header isAdmin={isAdmin} setAddGame={setAddGame} setIsFavourite={setIsFavourite} setLoggedIn={setLoggedIn} loggedIn={loggedIn} categories={uniqueCategories} setSelectedCategory={setSelectedCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setShowLoginModal={setShowLoginModal}/>
      {/* {addGame&&(
        <GameForm loggedIn={loggedIn} isAdmin={isAdmin} showModal={showModal} setShowModal={setShowModal} />
      )} */}
      {showLoginModal && (
        <LoginModal
          show={showLoginModal}
          handleClose={() => setShowLoginModal(false)}
          setLoggedIn={setLoggedIn}
          setIsAdmin={setIsAdmin}
        />
      )}
      
      
      <Home loggedIn={loggedIn} isFavourite={isFavourite} selectedCategory={selectedCategory} searchTerm={searchTerm}/>
      
    </div>
  )
}

export default App