import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = () => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">Description: {event.description}</div>
                        <div className="event__date__time">Date/Time: {event.date} at {event.time}</div>
                        <div className="event__organizer">Organized by: {event.organizer}</div>
                    </section>
                })
            }
        </article>
    )
}