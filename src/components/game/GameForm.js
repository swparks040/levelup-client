import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, getGameTypes } from "../../managers/GameManager.js";

export const GameForm = () => {
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0,
  });

  useEffect(() => {
    getGameTypes().then((data) => setGameTypes(data));
    // TODO: Get the game types, then set the state
  }, []);

  const changeGameState = (domEvent) => {
    // TODO: Complete the onChange function
    const copy = { ...currentGame };
    copy[domEvent.target.id] = domEvent.target.value;
    setCurrentGame(copy);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            autoFocus
            className="form-control"
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            id="maker"
            required
            autoFocus
            className="form-control"
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="number_of_players">Number of Players: </label>
          <input
            type="number"
            name="number_of_players"
            id="numberOfPlayers"
            required
            autoFocus
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="skill_level">Skill Level: </label>
          <input
            type="number"
            name="skill_level"
            id="skillLevel"
            required
            autoFocus
            className="form-control"
            value={currentGame.skillLevel}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="game_type">Game Type: </label>
          <select
            value={currentGame.gameTypeId}
            name="game_type"
            id="gameTypeId"
            onChange={changeGameState}
          >
            <option value="0">Choose Game Type</option>
            {gameTypes.map((gameType) => (
              <option key={`game_type--${gameType.id}`} value={gameType.id}>
                {gameType.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* TODO: create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();
          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.numberOfPlayers),
            skill_level: parseInt(currentGame.skillLevel),
            game_type: parseInt(currentGame.gameTypeId),
          };
          // Send POST request to your API
          createGame(game).then(() => navigate("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
      <button className="btn btn-primary" onClick={() => navigate(`/games`)}>
        Back
      </button>
    </form>
  );
};
