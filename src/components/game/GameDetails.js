import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificGame } from "../../managers/GameManager";

export const GameDetails = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState([]);
  // const [gameTypes, setGameTypes] = useState([])
 
  const navigate = useNavigate();
  
  useEffect(() => {getSpecificGame(gameId).then(setGame)}, [gameId])
  // useEffect(() => {getGameTypes().then(data => setGameTypes(data))}, []) 

  return (
    <>
      <section className="game">
        <h2 className="game__header">{game.title}</h2>
        <p className="game__text">Maker: {game.maker}</p>
        <p className="game__text">Number of Players: {game.number_of_players}</p>
        <p className="game__text">Skill Level: {game.skill_level}</p>
      </section>
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/games`)}
      >
        Back
      </button>
      <button

          className="btn btn-primary"
          onClick={() => navigate(`/games/${game.id}/edit`)}
        >
          Update
        </button>
    </>
  );
}; 