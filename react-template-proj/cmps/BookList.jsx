import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onSelectBook, onRemoveBook }) {
  return (
    <section className="books-lst-container">
      {books.map((book , idx) => <div key={book.id} className="book-card">
        <BookPreview book={book} idx={idx+1} />
        
        <button onClick={() => onSelectBook(book.id)} className = 'select-btn'>Select</button>
        <button onClick={() => onRemoveBook(book.id)} className = 'delete-btn'>Delete</button>
      </div>
      )}
    </section>
  )
}
