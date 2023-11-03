import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieDetail(){
    const [movieDetail, setMovieDetail] = useState(null);

    const {id} = useParams();

    const handleGetMovie = async () => {
        const response = await axios.get('http://localhost:8080/movies');
        const data = response.data;
        setMovieDetail(data)
    }

    useEffect(()=>{
        handleGetMovie();
    },[])

    return(
        <>
            <h2>영화광</h2>
            {movieDetail && (
                <>
                    <h3>영화제목 : {movieDetail[id].title}</h3>
                    <h3>감상 : {movieDetail[id].content}</h3>
                </>
            )}
        </>
    )
}