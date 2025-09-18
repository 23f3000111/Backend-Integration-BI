import './App.css'
import Book from './components/Book'
import BookByTitle from './components/BookByTitle'
import BookByAuthor from "./components/BookByAuthor"

function App() {

  return (
    <>
      <Book />
      <BookByTitle title="Shoe Dog"/>
      <BookByAuthor author="Harper Lee"/>
    </>
  )
}

export default App
