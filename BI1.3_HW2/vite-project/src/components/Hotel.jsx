import { useState } from "react"
import useFetch from "../useFetch"

const Hotel = () => {
    const [message, setMessage] = useState('')
    const {data, loading, error} = useFetch("http://localhost:3000/hotels")
    
    const handleDelete = async (hotelId) => {
        try {
            const response = await fetch(`http://localhost:3000/hotels/${hotelId}`,
                {method: "DELETE"})

                if (!response.ok) {
                    throw "Failed to delete hotel."
                }

                const data = await response.json();
                if (data) {
                    setMessage("Hotel delete successfully")
                    window.location.reload()
                }
        } catch (error) {
            console.log(error);
        } 
    }
    

    return(
        <>
        <h2>All Hotels</h2>
        <ul>
            {data?.map((hotel) => (
                <li key={hotel._id}>{hotel.name} <button onClick={() => {handleDelete(hotel._id)}}>Delete</button>
                </li>
            ))}
        </ul>
        <p>{message}</p>
        </>
    )
}

export default Hotel;