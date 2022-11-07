import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])


    return (
        <article className="games">
            <header>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                    navigate({ pathname: "/games/new" })
                    }}
                    >Register New Game</button>
            </header>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">Title: {game.title} by {game.maker}</div>
                        <div className="game__players">Players Required: {game.number_of_players}</div>
                        <div className="game__skillLevel">Skill level: {game.skill_level} of 10</div>
                    </section>
                })
            }
        </article>
    )
}