import React, { useState } from 'react'
import clock from '../img/clock.svg'
import dayjs from 'dayjs'
import hearth1 from '../img/hearth1.svg'
import favorite from '../img/favorite.svg'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)



export const Card = ({ cardInfo, hits, organizeHits }) => {

    const [hearthType, setHearthType] = useState(cardInfo.icon || hearth1);
    const timeAgo = dayjs(cardInfo.created_at).fromNow()

    //Change the hearth icon and store a new array of favorites hits
    const handleFavorite = () => {
        if (hearthType === hearth1) {
            setHearthType(favorite)
            cardInfo.icon = favorite
            //this key is used to valite when the option to show favorite is on
            cardInfo.favorite = true
        } else {
            setHearthType(hearth1)
            cardInfo.icon = hearth1
            cardInfo.favorite = false
        }
        organizeHits(hits, cardInfo, hearthType)
    }

    return (
        <div className='card'>
            <a href={cardInfo.story_url} target='_blank' className='card-body' rel="noreferrer">
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
