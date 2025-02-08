const { useEffect, useState } = React

import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/book-list.jsx'
import { BookDetails } from './book-details.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'

export function BookApp() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => {
      setBooks(books)
    })
  }

  function onSelectBook(bookId) {
    bookService.getById(bookId).then((book) => {
      setSelectedBook(book)
    })
  }

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
  }

  // console.log(books)
  if (!books || !books.length) return <div>Loading...</div>
  return (
    <main>
      {!selectedBook && (
        <React.Fragment>
          <BookFilter onSetFilter={onSetFilter} />
          <BookList books={books} onSelectBook={onSelectBook} />
        </React.Fragment>
      )}

      {selectedBook && (
        <BookDetails book={selectedBook} onGoBack={() => onSelectBook(null)} />
      )}
    </main>
  )
}
