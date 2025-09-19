import { useState } from "react"
import useFetch from "../useFetch"

const Movie = () => {
    const [message, setMessage] = useState('')
    const {data, loading, error} = useFetch("http://localhost:3000/movies")

    const handleDelete = async (movieId) => {
        try {
            const response = await fetch(`http://localhost:3000/movies/${movieId}`,
                {method: "DELETE"})

                if (!response.ok) {
                    throw "Failed to delete movie."
                }

                const data = await response.json();
                if (data) {
                    setMessage("Movie delete successfully")
                    window.location.reload()
                }
        } catch (error) {
            console.log(error);
        } 
    }
    
    return(
        <>
        <ul>
            {data?.map((movie) => (
                <li key={movie._id}>
                    {movie.title} <button onClick={() => {handleDelete(movie._id)}}>Delete</button>
                    </li>
            ))}
        </ul>
        <p>{message}</p>
        </>
    )
}

export default Movie;