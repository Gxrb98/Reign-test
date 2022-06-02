import React from 'react'

export const Btn = ({ text, style, onClickFC }) => {
    return (
        <btn onClick={onClickFC} className={style}>{text}</btn>
    )
}
