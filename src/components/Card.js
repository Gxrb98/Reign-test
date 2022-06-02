import React, { useState, useEffect } from 'react'
import clock from '../img/clock.svg'
import dayjs from 'dayjs'
import hearth1 from '../img/hearth1.svg'
import favorite from '../img/favorite.svg'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)



export const Card = ({ cardInfo, hits }) => {

    const [hearthType, setHearthType] = useState(cardInfo.icon || hearth1);
    const timeAgo = dayjs(cardInfo.created_at).fromNow()

    //Change the hearth icon and store a new array of favorites hits
    const handleFavorite = () => {
        console.log(cardInfo)
        if (hearthType === hearth1) {
            setHearthType(favorite)
            cardInfo.icon = favorite
            cardInfo.favorite = true
        } else {
            setHearthType(hearth1)
            cardInfo.icon = hearth1
            cardInfo.favorite = false
        }
        let auxVar = hits.filter((hit) => hit.objectID !== cardInfo.objectID)
        auxVar.push(cardInfo)
        localStorage.setItem('hits', JSON.stringify(hits))
    }

    return (
        <div className='card'>
            <a href={cardInfo.story_url} target='_blank' className='card-body'>
                <p className='card-time'>
                    <img src={clock} alt='clock icon' />
                    <span>{timeAgo} by author</span>
                </p>
                <p className='card-title'>{cardInfo.story_title}</p>
            </a>
            <div className='card-fav'>
                <img src={hearthType} alt='favorite selector' onClick={handleFavorite} />
            </div>
        </div >
    )
}
