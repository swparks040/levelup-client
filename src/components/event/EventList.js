import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEvents } from "../../managers/EventManager.js";

export const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <header>
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            navigate({ pathname: "/events/new" });
          }}
        >
          Create New Event
        </button>
      </header>
      {events.map((event) => {
        return (
          <section key={`event--${event.id}`}>
            {event.title}
            <div className="event__description">
              Description: <Link to={`/events/${event.id}`}>{event.description}</Link>
            </div>
            <div className="event__date__time">
              Date/Time: {event.date} at {event.time}
            </div>
            <div className="event__organizer">
              Organized by: {event.organizer}
            </div>
          </section>
        );
      })}
    </article>
  );
};
