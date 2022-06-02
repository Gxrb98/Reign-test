import React from 'react'
import clock from '../img/clock.svg'
import dayjs from 'dayjs'

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export const Card = ({ cardInfo }) => {

    const timeAgo = dayjs(cardInfo.created_at).fromNow()
    return (
        <div className='card'>
            <div className='card-body'>
                <p className='card-time'>
                    <img src={clock} />
                    <span>{timeAgo}</span>
                </p>
                <p>body</p>
            </div>
            <div className='card-fav'>
                <img src="img/iconmonstr-favorite-3.png" />
            </div>
        </ div>
    )
}
