import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { Link } from "react-router-dom"
import "./events.css"
import { IndividualEvent } from "./IndividualEvent.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map((event) => (
                    <IndividualEvent
                    key={`event--${event.id}`}
                    eventId={event?.id}
                    description={event?.description}
                    date={event?.date}
                    time={event?.time}
                    gamers={event?.gamers}
                    isJoined={event.joined}
                    setEvents={setEvents}
                    />
                ))}
        </article>
    )
}