import { useEffect, useState } from "react";
import axios from "axios";

const getMovie = async () => {
    const response = await axios.get('http://localhost:8080/movies');
    const data = response.data;
    return data
}

export default function List (){

    const [movies, setMovies] = useState(()=>{ 
        getMovie()
            .then((data)=> {
                setMovies(data)
            })
    });

    const handleDel =  (item) => async (event) => {
        try {
            // console.log(item)
            axios.delete('http://localhost:8080/delete',{
                data : {
                    id : item._id
                },
            }).then((response)=> {
                if (response.status !== 200) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.data;
            }).then((result)=>{
                // console.log(result)
            })
            
        } catch(error) {
            console.error(error);
        }
        
    }

    return(
        <>
            {movies && movies.map((item, i)=>(
                <div style={{border: "1px solid black"}} key={i}>
                    <h3>제목 : {item.title}</h3>
                    <h3>내용 : {item.content}</h3>
                    <button onClick={handleDel(item)}>지울래?</button>
                </div>
            ))}
        </>
    )
}