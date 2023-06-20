import React, { useState } from "react";
import axios from "axios";
import "../Styles/GameForm.css";

const GameForm = ({ loggedIn, isAdmin, addGame, setAddGame }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the game data
    const gameData = {
      name,
      image,
      link,
      categories,
    };

    try {
      // Send the game data to the server
      const response = await axios.post(
        "http://localhost:8800/api/games",
        gameData
      );
      if(response.data.success){
        alert("game added successfully");
      }
       // Handle the response as needed

      // Reset the form
      setName("");
      setImage("");
      setLink("");
      setCategories([]);
      setAddGame(true);
    } catch (error) {
      console.error("Error submitting game form:", error);
    }
  };

  const handleModalToggle = () => {
    setAddGame(false);
  };

  return (
    <div>
      {addGame && (
        <div className="game-form-modal-overlay">
          <div className="game-form-modal">
            <div className="game-form-modal-header">
              <h5 className="game-form-modal-title">Add Game</h5>
              <button
                type="button"
                className="game-form-close"
                onClick={handleModalToggle}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="game-form-modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Categories (comma-separated)"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value.split(","))}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameForm;
