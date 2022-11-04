import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
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