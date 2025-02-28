import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BrowseBooks = () => {
  const reduxBooks = useSelector((state) => state.book.books);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isValidSearch, setIsValidSearch] = useState(true);

  // Load books from localStorage when component mounts
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks([...storedBooks, ...reduxBooks]); // Merge Redux & Local Storage books
  }, [reduxBooks]);

  // Filter books by title, author, or category
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? book.genre === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue.trim() === '') {
      setIsValidSearch(true);
    } else {
      const isValid = books.some((book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author.toLowerCase().includes(searchValue.toLowerCase())
      );
      setIsValidSearch(isValid);
    }
  };

  return (
    <div>
      {/* Header with Search Bar */}
      <div className="header">
        <h2>Browse Books</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <select 
            className="category-dropdown" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {[...new Set(books.map(book => book.genre))].map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Filtered Books */}
      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.id || Math.random()} className="book__card">
            <img src={book.coverImage} alt={book.title} className="book-image" />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Description: {book.description}</p>
            <p>Price: ${book.price}</p>
            <div className="visit_book">
              <Link to={`/book/${book.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally render the invalid search message */}
      {!isValidSearch && <p className="invalid-msg">Please enter a valid book name or author name.</p>}

      {/* CSS for centering the search bar */}
      <style>{`
        .search-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .search-input {
          width: 50%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .category-dropdown {
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background: white;
        }
      `}</style>
    </div>
  );
};

export default BrowseBooks;