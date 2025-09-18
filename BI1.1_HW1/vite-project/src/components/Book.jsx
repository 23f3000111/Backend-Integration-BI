import useFetch from "../useFetch"

const Book = () => {
    const {data, loading, error} = useFetch("http://localhost:3000/books")
    
    return(
        <>
        <h2>All Books</h2>
        <ul>
            {data?.map((book) => (
                <li>{book.title}</li>
            ))}
        </ul>
        </>
    )
}

export default Book;