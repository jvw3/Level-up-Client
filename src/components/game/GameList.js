import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import { Link } from "react-router-dom"
// import { deleteGame } from "../../managers/GameManager.js"
// import { getUpdatedGamesList } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const getUpdatedGamesList = () => {
    return fetch(`http://localhost:8000/games`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
      .then((res) => res.json())
      .then(data => setGames(data))
};

const deleteGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
    })
    .then(() => {
        getUpdatedGamesList();
      })
}

const destroyGame = (id) => {
        return <>
        <button
        onClick={() => {
                deleteGame(id)
            }}
        >Delete Game</button>
        </>
    }

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        {destroyGame(game.id)}
                        <div>
                            <Link to={`/editgame/${game.id}`}>Edit Game</Link>
                        </div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                    </section>
                })
            }
        </article>
    )
}