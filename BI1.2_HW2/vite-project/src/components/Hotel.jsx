import useFetch from "../useFetch"

const Hotel = () => {
    const {data, loading, error} = useFetch("http://localhost:3000/hotel")
    
    return(
        <>
        <h2>All Hotels</h2>
        <ul>
            {data?.map((hotel) => (
                <li>{hotel.name}</li>
            ))}
        </ul>
        </>
    )
}

export default Hotel;