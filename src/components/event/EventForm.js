import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGamers } from '../../managers/GamerManager.js'
import { getGames } from '../../managers/GameManager.js'
import { createEvent } from "../../managers/EventManager.js"



export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [newEvent, setNewEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Create New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={newEvent.description}
                        onChange={(evt) => {
                    const copy = { ...newEvent };
                    copy.description = evt.target.value;
                    setNewEvent(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="data">Date: </label>
                    <input type="date" name="data" required autoFocus className="form-control"
                        value={newEvent.date}
                        onChange={(evt) => {
                    const copy = { ...newEvent };
                    copy.date = evt.target.value;
                    setNewEvent(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={newEvent.time}
                        onChange={(evt) => {
                    const copy = { ...newEvent };
                    copy.time = evt.target.value;
                    setNewEvent(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game: </label>
                    <select type="number" name="skill-level" required autoFocus className="form-control"
                        value={newEvent.gameId}
                         onChange={(evt) => {
                    const copy = { ...newEvent };
                    copy.gameId = evt.target.value;
                    setNewEvent(copy);
                  }}
                  >
                    <option value="0">Choose Game for Event</option>
                  {games.map((game) => {
                    return (
                      <option value={game.id} key={game.id}>
                        {game.title}
                      </option>
                    );
                  })}
                  </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: newEvent.description,
                        date: newEvent.date,
                        time: newEvent.time,
                        game: newEvent.gameId
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create New Event</button>
        </form>
    )
}