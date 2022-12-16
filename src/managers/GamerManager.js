export const getGamers = () => {
    return fetch("http://localhost:8000/gamers", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}