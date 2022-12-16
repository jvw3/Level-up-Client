export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}



export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(game)
    })
        .then(response => response.json())
}

export const updateGame = (game, id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(game)
    })
        .then(response => response.json())
}



const getUpdatedGamesList = (setGames) => {
    return fetch(`http://localhost:8000/games`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
      .then((res) => res.json())
      .then(data => setGames(data))
  };


export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => response.json())
}