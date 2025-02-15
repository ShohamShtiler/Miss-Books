import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookList({ books, onRemove }) {
  return (
    <section className="books-lst-container">
    {books.map(book =>
                <div key={book.id} className="book-card">
                    <BookPreview book={book} />
                    {/* <button onClick={() => onRemoveBook(book.id)} className='delete-btn'>Delete</button> */}
                    <nav className='book-nav'>
                    <button onClick={() => onRemove(book.id)} className='delete-btn'>Delete</button>
                        <Link to={`/book/${book.id}`}><button className="select-btn">Select</button></Link>
                        <Link to={`/book/edit/${book.id}`}><button>Edit</button></Link>
                    </nav>
                  </div>
            )}

    </section>
  )
}
