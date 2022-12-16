import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateEvent } from "../../managers/EventManager.js"
import { updateGame, getGameTypes, getSingleGame, getGames } from '../../managers/GameManager.js'
import { getSingleEvent } from "../../managers/EventManager.js"


export const EditEvent = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    const {eventId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */ 
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: 0
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    useEffect(() => {
        getSingleEvent(eventId).then(data => setCurrentEvent(data))
    }, [eventId])



    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Event: {currentEvent.description}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={(evt) => {
                    const copy = { ...currentEvent };
                    copy.description = evt.target.value;
                    setCurrentEvent(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Date: </label>
                    <input type="date" name="title" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={(evt) => {
                    const copy = { ...currentEvent };
                    copy.date = evt.target.value;
                    setCurrentEvent(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Time: </label>
                    <input type="time" name="skill-level" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={(evt) => {
                    const copy = { ...currentEvent };
                    copy.time = evt.target.value;
                    setCurrentEvent(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game: </label>
                    <select type="number" name="skill-level" required autoFocus className="form-control"
                        value={currentEvent.game.id}
                         onChange={(evt) => {
                    const copy = { ...currentEvent };
                    copy.game.id = evt.target.value;
                    setCurrentEvent(copy);
                  }}
                  >
                    <option value="0">Choose your game</option>
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
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: currentEvent.game.id
                    }

                    // Send POST request to your API
                    updateEvent(event, eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Save Changes</button>
        </form>
    )
}