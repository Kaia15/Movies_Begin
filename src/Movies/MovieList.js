import React from 'react';

export default function Movies() {
    const [movie, setMovie] = useState({});
    const [movieList, setMovieList] = useState([])

    return (
        <div>
            <input 
                name = "name" value = {movie}
                placeholder = "Enter your favorite movies"

            />
        </div>
    )
}