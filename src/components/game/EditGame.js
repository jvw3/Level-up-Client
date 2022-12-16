import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateGame, getGameTypes, getSingleGame } from '../../managers/GameManager.js'


export const EditGameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    const {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 0,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    useEffect(() => {
        getSingleGame(gameId).then(data => setCurrentGame(data))
    }, [gameId])



    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Game: {currentGame.title}</h2>
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
                        value={currentGame.skill_level}
                        onChange={(evt) => {
                    const copy = { ...currentGame };
                    copy.skill_level = evt.target.value;
                    setCurrentGame(copy);
                  }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="number" name="skill-level" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                         onChange={(evt) => {
                    const copy = { ...currentGame };
                    copy.number_of_players = evt.target.value;
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
                        value={currentGame?.game_type?.id}
                         onChange={(evt) => {
                    const copy = { ...currentGame };
                    copy.game_type.id = evt.target.value;
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
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type.id)
                    }

                    // Send POST request to your API
                    updateGame(game, gameId)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Save Changes</button>
        </form>
    )
}