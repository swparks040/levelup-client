export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getGameById = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", { 
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        } 
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json(game))
}

export const updateGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(game)
    })
    .then(response => response.json())

}

export const deleteGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
})}


