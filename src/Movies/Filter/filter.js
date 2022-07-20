import React from 'react'

export default function Filter({filterType} ) {
    const cats = ["Genres", "Nations", "Popular", "Years"];
    return (
        <div>
            Categories: 
            {cats.map(obj => {
                return (
                    <button 
                    onClick = {() => {
                        filterType(obj)}}> {obj} </button>
                )
            })}
        </div>
    )
}