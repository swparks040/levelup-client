import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById } from "../../managers/EventManager";

export const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState([]);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      getEventById(eventId).then(setEvent);
    }, [eventId]);

    return (
        <>
          <section className="event">
            <h2 className="event__text">Description: {event.description}</h2>
            <p className="event__text">
              Date: {event.date}
            </p>
            <p className="event__text">Time: {event.skill_level}</p>
          </section>
          <button className="btn btn-primary" onClick={() => navigate(`/events`)}>
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/events/${event.id}/edit`)}
          >
            Update
          </button>
        </>
      );
    };
     