import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Favourites = ({ searchTerm }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const fetchGames = async () => {
    try {
      let apiUrl = 'http://localhost:8800/api/favgames';

      const response = await axios.get(apiUrl);
      const data = response.data.favoriteGames;
      setGames(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const filterGames = () => {
      const filtered = games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGames(filtered);
    };

    filterGames();
  }, [games, searchTerm]);

  const handleDelete = async (gameId) => {
    try {
      const response = await axios.delete(`http://localhost:8800/api/favoriteGames/${gameId}`);
      console.log(response.data);
      // Refresh the list of favorite games after deletion
      fetchGames();
    } catch (error) {
      console.error('Error deleting game:', error);
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
              <button className="btn btn-danger" onClick={() => handleDelete(game._id)}>
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
