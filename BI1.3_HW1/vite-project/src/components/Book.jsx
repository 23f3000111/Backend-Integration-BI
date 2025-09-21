import { useState } from "react"
import useFetch from "../useFetch"

const Book = () => {
    const [message, setMessage] = useState('')
    const {data, loading, error} = useFetch("http://localhost:3000/books")
    
    const handleDelete = async (bookId) => {
        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}`,
                {method: "DELETE"})

                if (!response.ok) {
                    throw "Failed to delete book."
                }

                const data = await response.json();
                if (data) {
                    setMessage("Book delete successfully")
                    window.location.reload()
                }
        } catch (error) {
            console.log(error);
        } 
    }
    

    return(
        <>
        <h2>All Books</h2>
        <ul>
            {data?.map((book) => (
                <li key={book._id}>{book.title} <button onClick={() => {handleDelete(book._id)}}>Delete</button>
                </li>
            ))}
        </ul>
        <p>{message}</p>
        </>
    )
}

export default Book;