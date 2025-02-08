const { useEffect, useState } = React

import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookEdit } from './BookEdit.jsx'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then((books) => {
                setBooks(books)
            })
    }

    function onSelectBook(bookId) {
        const book = books.find(book => book.id === bookId)
        setSelectedBook(book)

        // bookService.getById(bookId)
        //     .then(book => setSelectedBook(book))
    }

    function onUpdateBook(bookToSave) {
        bookService.save(bookToSave)
            .then((savedBook) => {
                setSelectedBook(bookToSave)
                setIsEdit(false)
                setBooks(prevBooks => prevBooks.map((b) => b.id === savedBook.id ? savedBook : b))
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks => 
                prevBooks.filter(book => book.id !== bookId)))
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    // console.log(books)
    if (!books) return <div>Loading...</div>
    return (
        <main>
            {!selectedBook && (
                <React.Fragment>
                    <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                    {books.length && <BookList books={books} onSelectBook={onSelectBook} onRemoveBook={onRemoveBook} />}
                    {!books.length && <div> No Books found...</div>}
                </React.Fragment>
            )}

            {selectedBook && (
                <section>
                    {!isEdit && (
                        <BookDetails
                            book={selectedBook}
                            onGoBack={() => setSelectedBook(null)}
                            onGoEdit={() => setIsEdit(true)}
                        />
                    )}

                    {isEdit && (
                        <BookEdit
                            book={selectedBook}
                            onUpdate={onUpdateBook}
                            onCancelEdit={() => setIsEdit(false)}
                        />
                    )}
                </section>
            )}
        </main>
    )
}
