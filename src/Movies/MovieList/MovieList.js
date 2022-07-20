import React from 'react'

export default function MovieList({movieInput, movie, handleSubmit}) {
    return (
        <div>
            <div className='NewPlaylist'>
            Title: <input
                name = "Title" 
                value = {movie.Title}
                onChange = {movieInput}
                placeholder = "Enter your title"
            />
            <br />
            Year: <input 
                name = "Year"
                value = {movie.Year}
                onChange = {movieInput}
                placeholder = "Enter movie's year"
            />
            <br />
            imdbID: <input 
                name = "imdbID"
                value = {movie.imdbID}
                onChange = {movieInput}
                placeholder = "Enter movie's id"
            />
            <br />
            Type: <input 
                name = "Type"
                value = {movie.Type}
                onChange = {movieInput}
                placeholder = "Enter movie's type "
            />
            <br />
            Poster: <input 
                name = "Poster"
                value = {movie.Poster}
                onChange = {movieInput}
                placeholder = "Enter movie's poster"
            />
            <br />
            <button onClick = {handleSubmit}> Add </button>
            </div>
            
        </div>
    )
}