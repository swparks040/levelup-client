import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateGame, getGameTypes } from '../../managers/GameManager.js'


export const UpdateGameForm = () => {
    
    const {gameId} = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, updateCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(
        () => {
           getGameTypes().then(gameTypeArray => setGameTypes(gameTypeArray))
        // TODO: Get the game types, then set the state
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/games/${gameId}`)
          .then((response) => response.json())
          .then((data) => {
            updateGame(data);
          });
      }, [gameId]);
 
    const navigate = useNavigate()

    const changeGameState = (domEvent) => {
       const copy = {...currentGame } 
       copy[domEvent.target.id] = domEvent.target.value
       updateGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update This Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title" required autoFocus className="form-control"
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" id="maker" required autoFocus className="form-control"
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" name="number_of_players" id="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skill_level" id="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="game_type">Game Type: </label>
                <select
                    value={currentGame.gameTypeId} name="game_type" id="gameTypeId"
                    onChange={changeGameState}>
                    <option value="0">Choose Game Type</option>
                    {
                        gameTypes.map(gameType => <option key={`game_type--${gameType.id}`} value={gameType.id}>{gameType.label}</option>)
                    }
                </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }
                    // Send POST request to your API
                    updateCurrentGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
                <button
        
        className="btn btn-primary"
        onClick={() => navigate(`/games/${gameId}`)}
      >
        Back
      </button>
        </form>
    )
}