import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent, getGames } from "../../managers/EventManager.js";

export const EventForm = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  // const [gamers, setGamers] = useState([])

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentEvent, setCurrentEvent] = useState({
    game: "",
    description: "",
    date: "",
    time: "",
    // organizer: ""
  });

  useEffect(() => {
    getGames().then((data) => setGames(data));
    // TODO: Get the game types, then set the state
  }, []);

  // useEffect(
  //     () => {
  //        getGamers().then(data => setGamers(data))
  //     // TODO: Get the game types, then set the state
  // }, [])

  const changeEventState = (domEvent) => {
    // TODO: Complete the onChange function
    const copy = { ...currentEvent };
    copy[domEvent.target.id] = domEvent.target.value;
    setCurrentEvent(copy);
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Create New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="game">Game: </label>
          <select
            value={currentEvent.game}
            name="game"
            id="game"
            onChange={changeEventState}
          >
            <option value="0">Choose Game</option>
            {games.map((game) => (
              <option key={`game--${game.id}`} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Description: </label>
          <input
            type="text"
            name="description"
            id="description"
            required
            autoFocus
            className="form-control"
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            name="date"
            id="date"
            required
            autoFocus
            className="form-control"
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time: </label>
          <input
            type="time"
            name="time"
            id="time"
            required
            autoFocus
            className="form-control"
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      {/* <fieldset>
                <div className="form-group">
                <label htmlFor="organizer">Organizer: </label>
                <select
                    value={currentEvent.organizer} name="gamer" id="organizer"
                    onChange={changeEventState}>
                    <option value="0">Choose Gamer</option>
                    {
                        gamers.map(gamer => <option key={`gamer--${gamer.id}`} value={gamer.id}>{gamer.first_name}</option>)
                    }
                </select>
                </div>
            </fieldset> */}

      {/* TODO: create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();
          const event = {
            game: currentEvent.game,
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            // organizer: (currentEvent.organizer)
          };
          // Send POST request to your API
          createEvent(event).then(() => navigate("/events"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
      <button className="btn btn-primary" onClick={() => navigate(`/events`)}>
        Back
      </button>
    </form>
  );
};
