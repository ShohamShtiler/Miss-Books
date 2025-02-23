const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM


import { LongTxt } from "../cmps/LongTxt.jsx";
import { booksService } from "../services/books.service.js";
import { AddReview } from "../cmps/AddReview.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";
import { showErrorMsg } from "../services/event-bus.service.js";
import { reviewService } from "../services/review.service.js";


export function BookDetails() {
    const [book, setBook] = useState(null)
    console.log('book:', book)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)


    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadBook()
    }, [params.bookId])




    function loadBook() {
        setIsLoading(true)
        booksService.get(params.bookId)
            .then(setBook)
            .catch(() => {
                showErrorMsg('Couldnt get book...')
                navigate(`/book`)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }


    function getBookDateLevel() {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currYearDiff = currentYear - book.publishedDate
        return currYearDiff > 10 ? 'Vintage Book' : 'New Book'
    }


    function bookReadingLevel() {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        return 'Light Reading'
    }


    function onToggleReviewModal() {
        setIsShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    }


    function onSaveReview(reviewToAdd) {
        setIsLoadingReview(true)
        reviewService.saveReview(book.id, reviewToAdd)
            .then((review => {
                setBook(prevBook => {
                    const reviews = [review, ...prevBook.reviews]
                    return { ...prevBook, reviews }
                })
            }))
            .catch(() => showErrorMsg(`Review to ${book.title} Failed!`))
            .finally(() => setIsLoadingReview(false))
    }


    function onRemoveReview(reviewId) {
        setIsLoadingReview(true)
        reviewService.removeReview(book.id, reviewId)
            .then(() => {
                setBook(prevBook => {
                    const filteredReviews = prevBook.reviews.filter(review => review.id !== reviewId)
                    return { ...prevBook, reviews: filteredReviews }
                })
            })
            .finally(() => setIsLoadingReview(false))
    }


    if (isLoading || !book) return <div className="loader"></div>
    return (
        <article className='book-details'>
            <button className='close'>
                <Link to='/book'>
                    X
                </Link>
            </button>
            <nav className='book-details-nav'>
                <Link to={`/book/${book.prevBookId}`}>
                    <button>Prev</button>
                </Link>
                <Link to={`/book/${book.nextBookId}`}>
                    <button>Next</button>
                </Link>
            </nav>
            <h2>{book.title}</h2>
            <span>{getBookDateLevel()}</span>
            <h4>{bookReadingLevel()}</h4>


            <img className='book-img' src={book.thumbnail} alt="" />


            <p className={book.listPrice.amount > 200 ? 'highPrice' : 'lowPrice'}>
                <span className='bold-txt'>Price: </span>
                {book.listPrice.amount} {book.listPrice.currencyCode}
            </p>
            <p>
                <span className='bold-txt'>Language:</span>
                {book.language}
            </p>
            {book.categories && <p>
                <span className='bold-txt'>Categoric:</span> {book.categories}
            </p>}
            {book.authors && <p>
                <span className='bold-txt'>Authors:</span> {book.authors}
            </p>}
            {book.description && <LongTxt txt={book.description} />}
            {book.listPrice.isOnSale && <img className="on-sale-icon" src="/react-template-proj/assets/img/onSale.png.png" alt="" />}


            <hr className='brake-line' />


            <button onClick={onToggleReviewModal}>Add Review</button>
            {isShowReviewModal && (
                <AddReview
                    toggleReview={onToggleReviewModal}
                    onSaveReview={onSaveReview}
                />
            )}


            <div className='review-container'>
                {!isLoadingReview
                    ? <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
                    : <div className="loader"></div>
                }
            </div>


        </article>
    )
}
