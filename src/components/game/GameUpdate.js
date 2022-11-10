import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateGame, getGameTypes, getGameById } from "../../managers/GameManager.js";

export const UpdateGameForm = () => {
  const { gameId } = useParams();
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, updateCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0,
  });

  useEffect(() => {
    getGameTypes().then((gameTypeArray) => setGameTypes(gameTypeArray));
    // TODO: Get the game types, then set the state
  }, []);

  useEffect(() => {
    getGameById(gameId).then(data => updateCurrentGame({
      skillLevel: data.skill_level,
      numberOfPlayers: data.number_of_players,
      gameTypeId: data.game_type,
      title: data.title,
      maker: data.maker
    }))
  }, [gameId]);

  const navigate = useNavigate();

  const changeGameState = (domEvent) => {
    const copy = { ...currentGame };
    copy[domEvent.target.id] = domEvent.target.value;
    updateCurrentGame(copy);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Update This Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={currentGame.title}
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
            value={currentGame.maker}
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
        className="btn btn-primary"
        onClick={() => navigate(`/games/${gameId}`)}
      >
        Back
      </button>
      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();
          const game = {
            id: gameId,
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.numberOfPlayers),
            skill_level: parseInt(currentGame.skillLevel),
            game_type: parseInt(currentGame.gameTypeId),
          };
          // Send PUT request to your API
          updateGame(game).then(navigate({ pathname: "/games"}));
        }}
        className="btn btn-primary"
      >
        Update
      </button>
    </form>
  );
};
