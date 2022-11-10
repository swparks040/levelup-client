export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getEventById = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

// export const getGamers = () => {
//     return fetch("http://localhost:8000/gamers", {
//         headers:{
//             "Authorization": `Token ${localStorage.getItem("lu_token")}`
//         }
//     })
//         .then(response => response.json())
// }

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
    })
    .then(response => response.json(event))
}

export const updateEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
    })
    .then(response => response.json())

}

export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
})}