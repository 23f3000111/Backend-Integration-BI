import useFetch from "../useFetch"

const Movie = () => {
    const {data, loading, error} = useFetch("http://localhost:3000/movies")
    
    return(
        <>
        <ul>
            {data?.map((movie) => (
                <li>{movie.title}</li>
            ))}
        </ul>
        </>
    )
}

export default Movie;