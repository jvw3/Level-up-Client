import React, { useEffect, useState } from "react"
import { joinEvent, getSingleEvent, getEvents, leaveEvent } from "../../managers/EventManager.js"
import { Link } from "react-router-dom"
import "./events.css"
import { useNavigate } from "react-router-dom"

export const IndividualEvent = ({eventId, description, date, time, gamers, isJoined, setEvents}) => {

    const navigate = useNavigate();

    const gamersInAttendance = () => {
        return <>
        {
            gamers.map(gamer => {
                <div>{gamer?.full_name}</div>
            })
        }
        </>
    }

    useEffect(() => {
        getSingleEvent(eventId).then(data => setCurrentEvent(data))
    }, [])

    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: 0,
        joined: false
    })



const addGamerToEvent = (eventId, event) => {
    joinEvent(eventId, event)
    .then(response => response.json())
    .then(() => {
        getEvents().then(data => setEvents(data));})
}

const deleteGamerFromEvent = (eventId) => {
    leaveEvent(eventId)
    .then(() => {
        getEvents().then(data => setEvents(data));})
}

const changeEventStatusButton = () => {
        return <>
        {
        isJoined
        ? <button
        onClick={() => {
                    {deleteGamerFromEvent(eventId)}
                }}>Leave Event</button>
        : <button
                onClick={(evt) => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: currentEvent.game.id,
                        joined: currentEvent.joined
                    }

                    addGamerToEvent(eventId, event)
                }}
                className="">Join Event</button>
        }
        </>
    }


    return <>
        <article className="event">
            <div className="event__description">{description}</div>
            <div> <Link to={`/editevent/${eventId}`}>Edit Event</Link>
            </div>
            <div className="event__players">{date}</div>
            <div className="event__skillLevel"> {time}</div>
            <div className="event__skillLevel"> gamers in attendance: {gamersInAttendance()}</div>
            {changeEventStatusButton()}
        </article>
    </>
}