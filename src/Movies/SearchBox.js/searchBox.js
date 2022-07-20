import React from 'react'

const SearchBox = ({searchInput, search, handleSearch}) => {
    return (
        <div className = "search-bar">
            <input 
                className='search'
                onChange = {searchInput}
                value = {search}
            />
            <button onClick = {handleSearch}> Search </button>
        </div>
    )
}

export default SearchBox;
