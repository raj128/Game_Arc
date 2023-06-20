import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const GameList = ({loggedIn, selectedCategory, searchTerm }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let apiUrl = 'http://localhost:8800/api/games';

        if (selectedCategory && selectedCategory !== "all") {
          apiUrl = `http://localhost:8800/api/games/category/${selectedCategory}`;
        }

        const response = await axios.get(apiUrl);
        const data = response.data;
        setGames(data);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGames();
  }, [selectedCategory]);

  useEffect(() => {
    const filterGames = () => {
      const filtered = games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGames(filtered);
    };

    filterGames();
  }, [games, searchTerm]);

  const handleAddToFavorites = async (gameId) => {
    try {
      const response = await axios.post(`http://localhost:8800/api/favoriteGames/${gameId}`);
      const { success, error } = response.data;
      if (success) {
        // Game added to favorites successfully
        alert("Game added to favorites");
      } else {
        // Error adding game to favorites
        alert(` ${error}`);
      }
    } catch (error) {
      console.error('Error adding game to favorites:', error);
    }
  };

  return (
    <div>
      <div className="card-container">
        {filteredGames.map((game) => (
          <div className="card" style={{ width: '18rem' }} key={game.id}>
            <img src={game.image} className="card-img-top" alt={game.name} />
            <div className="card-body">
              <h5 className="card-title">{game.name}</h5>
              <p className="card-text">{game.categories.join(', ')}</p>
              <a href={game.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                PLAY!
              </a>
              <br></br>
              {loggedIn ? (
                <button className="btn btn-success" onClick={() => handleAddToFavorites(game._id)}>
                  Add to Favorites
                </button>
              ) : (
                <button className="btn btn-success" onClick={() => alert("Please log in to add to favorites")}>
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
