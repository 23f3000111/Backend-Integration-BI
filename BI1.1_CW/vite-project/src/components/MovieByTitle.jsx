import useFetch from "../useFetch";

const MovieByTitle = ({title}) => {
        const {data, loading, error} = useFetch(`http://localhost:3000/movies/${title}`)
        console.log(data);
        
        return data ? (
            <div>
                <h2>{data.title}</h2>
                <p>Director: {data.director}</p>
            </div>
        ) : (
            loading && <p>Loading...</p>
        )
}

export default MovieByTitle;