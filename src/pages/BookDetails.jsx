import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookDetails = () => {
  const { id } = useParams();

  // Fetch books from Redux state
  const reduxBook = useSelector((state) =>
    state.book.books.find((b) => b.id === parseInt(id))
  );

  // Fetch books from localStorage
  const localBooks = JSON.parse(localStorage.getItem('books')) || [];
  const localBook = localBooks.find((b) => b.id.toString() === id);

  // Use Redux book if available, otherwise fallback to localStorage book
  const book = reduxBook || localBook;

  if (!book) {
    return (
      <div className="not-found">
        <p>❌ Book not found.</p>
        <Link to="/browse-books">
          <button className="back-btn-browse">Back to Browse</button>
        </Link>
      </div>
    );
  }

  // Function to render star rating
  const renderRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? 'filled-star' : 'empty-star'}>
          {i < rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="book-details-container">
      <div className="book-image-container">
        <img
          src={book.coverImage || 'https://via.placeholder.com/100x150'}
          alt={book.title}
          className="book-image"
        />
      </div>
      <div className="book-details">
        <h2 className="title">{book.title}</h2>
        <p className="author">
          <strong>Author:</strong> {book.author}
        </p>
        {book.publishedDate && (
          <p className="publishdate">
            <strong>Published Date:</strong> {book.publishedDate}
          </p>
        )}
        <p className="description">
          <strong>Description:</strong> {book.description}
        </p>
        {book.pages && (
          <p className="pages">
            <strong>Pages:</strong> {book.pages}
          </p>
        )}
        <p className="category">
          <strong>Category:</strong> {book.genre}
        </p>
        <p className="price">
          <strong>Price:</strong> ${book.price}
        </p>
        <p className="rating">
          <strong>Rating:</strong> {renderRating(book.rating)}
        </p>
        <Link to="/browse-books">
          <button className="back-btn-browse">Back to Browse</button>
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;
