import logo from './logo.svg';
import './App.css';
// import Content from '../src/Components/Content';
import React, { useEffect, useState, useRef } from 'react';
// import Movies from '../src/Movies/Movies';
import SearchBox from './Movies/SearchBox.js/searchBox';
import MovieList from './Movies/MovieList/MovieList';
import filmList from './Movies/Films/films';
import Pagination from '../src/Pagination/pagination';
import Filter from '../src/Movies/Filter/filter';
import genres from '../src/Movies/Filter/filteredTypes/Genres';
import nations from '../src/Movies/Filter/filteredTypes/Nations';
import popular from '../src/Movies/Filter/filteredTypes/Popular';
import years from '../src/Movies/Filter/filteredTypes/Years';


export default function App() {
  const storageMovies = JSON.parse(localStorage.getItem('movieList'));

  const [movie, setMovie] = React.useState({})
  const [movieList, setMovieList] = React.useState([{Title: "Harry Potter and the Deathly Hallows: Part 2", Year: "2011", imdbID: "tt1201607", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"}]);
  const [searchValue, setSearchValue] = React.useState("")
  const [searchList, setSearchList] = React.useState([])
  const [filterVal, setFilterVal] = React.useState("")
  const [filteredRes, setFilteredRes] = React.useState([])
  const [afterFilter, setAfterFilter] = React.useState([])
  const [hide, setHide] = React.useState(false)

  

  useEffect(() => {
    const jsonFilms = JSON.stringify(filmList);
    setMovieList(filmList);
    localStorage.setItem('movieList', jsonFilms);

  }, [filmList])

  const handleSearch = React.useMemo(
    () => {
    if (searchValue !== "") {
        setSearchList(() => {
            let filtered = movieList.filter(item => {
              const title = item.Title
              return title.toLowerCase().includes(searchValue) || title.toUpperCase().includes(searchValue)});
            return filtered;
        })
    } else {
        setSearchList([])
        console.log("Please retype your name of movie ")
        // alert("We cannot find your film!")
    }
    }
, [searchValue, movieList])

  const handleSubmit = () => {
    setMovieList((prev) => ([...prev, movie]))
    setMovie({Title: "", Year: "", imdbID: "", Type: "", Poster: ""})
  }

  const searchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const filterType = (input) => {
    setFilterVal(input)
    const options = matchedArr(input)
    setFilteredRes(options);
  }

  const matchedArr = (t) => {
    switch(t) {
      case "Genres":
        return genres
      case "Nations":
        return nations
      case "Popular":
        return popular
      case "Years":
        return years
      default:
        return []
    }

  }

  const movieInput = ({target}) => {
    const {name, value} = target;
    // console.log(target);
    setMovie((prev) => ({...prev, [name]: value}))
    console.log(movie);
  }

  const findIn = (e, arr) => {
    return arr.includes(e)
  }

  const readyFilter = (e) => {
    console.log(e)
    // console.log(genres.includes(e))
    let filteredFilms = [];
    if (findIn(e, genres)) {
      filteredFilms = filmList.filter(f => {
        let t = f.Type
        return t.toLowerCase() === e.toLowerCase() })
    } else if (findIn(e, nations)) {
      filteredFilms = filmList.filter(f => {
        let n = f.Nation
        return n.toLowerCase() === e.toLowerCase()
      })
    } else if (findIn(e, years)) {
      filteredFilms = filmList.filter(f => {
        let y = f.Year
        return y.toLowerCase() === e.toLowerCase()
      })
    }
    return filteredFilms
  }

  // console.log(movieList);
  // console.log(searchList);
  // console.log(filmList);
  // console.log(filterVal);
  // console.log(filteredRes)
  // console.log(afterFilter)
  console.log(hide)

  return (
    <div className='App'>
      <SearchBox searchInput = {searchInput} search = {searchValue} handleSearch = {() => handleSearch}/>
      {searchList.map((src, index) => (<li key = {index}>{src.Title}</li>))}
      <Filter filterType = {filterType} />
      {filteredRes.length > 0 && filteredRes.map(res => 
          {return <li key = {res} onClick = {() => 
            {
              setHide(!hide)
              setAfterFilter(readyFilter(res))
            }}> {res} </li>})}
      <br />
      {
        afterFilter.map(a => {return (<li key = {a.imdbID}> {a.Title} </li>)})
      }
      
      <div className = "Movies">
      {
        movieList.map((mov, index) => 
          {
            return (
              <div className='Movie'>
                <div className = "Poster">
                  <img src = {mov.Poster} alt = "movie" style = {{height: "80%", width: "50%"}}></img>
                </div>
                <div className = "Info">
                </div>
              </div>
            )
          }
          
        )
      }
      
      </div>
      

      <MovieList movieInput={movieInput} movie = {movie} handleSubmit = {handleSubmit}/>
      
    </div>

  );
}

/*function App() {

  const [pageAndsize, setPageAndSize] = React.useState({page: "1", size: "50"})
  const [list, setList] = React.useState([])

  const handleChange = ({target}) => {
    const {name, value} = target;
    setPageAndSize((prev) => ({...prev, [name]: value}))
  }

  const handleSubmit = ({target}) => {
    const {name, value} = target;
    setPageAndSize((prev) => ({...prev, [name]: value}))
    // setPageAndSize({page: "", size: ""})
  }

  useEffect(() => {
    if (pageAndsize.page !== "" && pageAndsize.size !== "") {
      const page = parseInt(pageAndsize['page']);
      const size = parseInt(pageAndsize['size']);
      fetch(`http://localhost:9000/api/v1/fake_tasks/scroll/?page=${page}&size=${size}`)
        .then(res => res.json())
        .then(posts => {
            setList(posts)
        })
    } else {
      alert ("please enter your page and size")
    }
    
    
  }, [pageAndsize])

  console.log(pageAndsize);

  return (
      <div>
          Page: <input value = {pageAndsize.page}
                        name = "page"
                        onChange = {handleChange}
          />
          <br />
          Size: <input value = {pageAndsize.size}
                  name = "size"
                  onChange = {handleChange}
          />      
          <br />
          <button onClick = {handleSubmit}> Submit</button>
          {list.length > 0 && list.map((l, index) => (
              <li key = {index}>{l.title}</li>
          ))}
      </div>
  )
}*/

/*function App() {
  const [pageAndSize, setPageAndSize] = React.useState({page: "", size: ""})

  const handleSubmit = ({target}) => {
    const {name, value} = target;
    if (pageAndSize['page'] !== "" && pageAndSize['size'] !== "") {
      setPageAndSize((prev) => ({...prev, [name]: value}))
    }
    else {
      alert('abcd')
    }
  }

  console.log(pageAndSize)
  const {list, hasMore, loading, error} = Pagination(pageAndSize)
  // console.log(list);

  return (
    <div>
      <input type = "text"
            name = "page"
            value = {pageAndSize.page}
            onChange = {(e) => setPageAndSize((prev) => ({...prev, page: e.target.value}))}
      />
      <br />
      <input type = "text"
              name = "size"
              value = {pageAndSize.size}
              onChange = {(e) => setPageAndSize((prev) => ({...prev, size: e.target.value}))}
      />
      <br />
      <button onClick = {handleSubmit}> Click me!</button>
      {list.length > 0 && list.map((obj, index) => {
        // console.log(index, obj.title);
        return <li key = {index}> {index}, {obj.title} </li>
      })}
    </div>
  )
}*/

// import React, { useRef, useState } from "react";

/*export default function App() {
  const listInnerRef = useRef();
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)

  // const buttonRef = React.useRef();

  // tìm hiểu event loop, và debounce

  const onScroll = () => {
    // console.log(listInnerRef.current)
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(listInnerRef.current['scrollTop'], listInnerRef.current['scrollHeight'], listInnerRef.current['clientHeight'])
      if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
        console.log("reached bottom");
        setPage(page + 1);
      }
    }
  };

  const fetchData = async(size) => {
    
    const response = await fetch(`http://localhost:9000/api/v1/fake_users/scroll/?page=${page.toString()}&size=${size}`)
    const jsonList = await response.json();
    
    // return jsonList
    console.log(jsonList)
    // jsonList.then(console.log);
    setUsers(users.concat(jsonList));
  }

  React.useEffect(() => {
    let ajaxTime= new Date().getTime();
    fetchData(100)
    let endTime = new Date().getTime();
    let a = endTime - ajaxTime;
    console.log(ajaxTime, endTime, a);
    return () => {}
  }, [page])

  // fetchData(90)
  console.log(users)

  return (
    <div>
      <div className='head'></div>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
      >
      {users.length > 0 && users.map((obj, index) => {
        return (
        <div key = {index} style = {{display: "flex", flexDirection: "row"}}>
          <div style = {{flex: "4", display: "flex", flexDirection: "row"}}>
          <div style = {{flex: "2"}}></div>
          <img src = {obj['clientProfile'].imageURL} style = {{ borderRadius: "50%", width: "50%", height: "80%", flex: 3}}/>
          <div style = {{flex: "2"}}></div>
          </div>
          <div style = {{flex: "5"}}>
          <li> {index}, {obj.name} </li>
          <li> {obj.age} </li>
          <li> {obj.gender} </li>
          <li> {obj.email} </li>
          </div>
        </div>
        
        )
      })}
      </div>
    </div>
  );
}
*/