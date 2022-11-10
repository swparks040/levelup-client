import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateEvent, getGames, getEventById } from "../../managers/EventManager.js";


export const UpdateEventForm = () => {
  const {eventId} = useParams()
  const [games, setGames] = useState([]);
  // const [gamers, setGamers] = useState([])

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentEvent, updateCurrentEvent] = useState({
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

  useEffect(() => {
    getEventById(eventId).then((data) => updateCurrentEvent(data))
  }, [eventId]);

  const navigate = useNavigate();

  const changeEventState = (domEvent) => {
    // TODO: Complete the onChange function
    const copy = { ...currentEvent };
    copy[domEvent.target.id] = domEvent.target.value;
    updateCurrentEvent(copy);
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Edit This Event</h2>
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
            value={currentEvent.description}
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
            value={currentEvent.date}
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
            value={currentEvent.time}
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
        className="btn btn-primary"
        onClick={() => navigate(`/events/${eventId}`)}
      >
        Back
      </button>
      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();
          const event = {
            id: eventId,
            game: currentEvent.game,
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            // organizer: (currentEvent.organizer)
          };
          // Send PUT request to your API
          updateEvent(event).then(navigate({ pathname: "/events"}));
        }}
        className="btn btn-primary"
      >
        Update
      </button>
    </form>
  );
};
