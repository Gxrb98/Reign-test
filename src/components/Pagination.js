import React from 'react'

export const Pagination = ({ hitsPerPage, totalHits, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalHits / hitsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className='pagination-list'>
                {
                    pageNumbers.map(number =>
                        <li onClick={() => paginate(number)} key={number} className='page-item'>
                            <a href='!#'>{number}</a>
                        </li>
                    )
                }
            </ul>

        </nav>
    )
}
