import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const changeGameState = (domEvent) => {
        const copy = { ...currentGame };
        copy.title = domEvent.target.value;
        setCurrentGame(copy);
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={(evt) => {
                    const copy = { ...currentGame };
                    copy.title = evt.target.value;
                    setCurrentGame(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Maker: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={(evt) => {
                    const copy = { ...currentGame };
                    copy.maker = evt.target.value;
                    setCurrentGame(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Skill Level: </label>
                    <input type="number" name="skill-level" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={(evt) => {
                    const copy = { ...currentGame };
                    copy.skillLevel = evt.target.value;
                    setCurrentGame(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="number" name="skill-level" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                         onChange={(evt) => {
                    const copy = { ...currentGame };
                    copy.numberOfPlayers = evt.target.value;
                    setCurrentGame(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game
                    Type: </label>
                    <select type="number" name="skill-level" required autoFocus className="form-control"
                        value={currentGame.gameTypeId}
                         onChange={(evt) => {
                    const copy = { ...currentGame };
                    copy.gameTypeId = evt.target.value;
                    setCurrentGame(copy);
                  }}
                  >
                    <option value="0">Choose your game type</option>
                  {gameTypes.map((gameType) => {
                    return (
                      <option value={gameType.id} key={gameType.id}>
                        {gameType.label}
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

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}