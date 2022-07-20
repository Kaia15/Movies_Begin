import React, { useEffect } from 'react'
import axios from 'axios'

export default function Pagination({page,size}) {
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [hasMore, setHasMore] = React.useState(false)

    useEffect(() => {
        /*let cancel
        axios({
            method: 'GET',
            url: `http://localhost:9000/api/v1/fake_tasks/scroll/?page=${page}&size=${size}`,
            params: {size: size, page: page},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => setList((prev) => {return [...prev, res.data]}))
        .catch(e =>{
            if (axios.isCancel(e)) return
        })*/
    
        fetch(`http://localhost:9000/api/v1/fake_tasks/scroll/?page=${page}&size=${size}`)
        .then(res => res.json())
        .then(posts => {
            setList(posts)
        })
    }, [])
    console.log(page, size)
    // return null
    return {list, hasMore, loading, error}
}