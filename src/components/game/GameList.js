import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getGames } from "../../managers/GameManager.js"

export const GameList = () => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {getGames().then(setGames)}, [])


    return <>
        <article className="games">
            <header>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                    navigate({ pathname: "/games/new" })
                    }}
                    >Register New Game</button>
            </header>
            {
                games.map(game => <h3>
                    <Link to={`/games/${game.id}`}>{game.title}</Link>
                </h3>)
            }
        </article></>
    
}