import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/bookSlice';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Fiction',
  'Science Fiction',
  'Romance',
  'Classic',
  'Adventure',
  'Dystopian Fiction',
  'Historical Fiction',
  'Fantasy',
  'Horror',
  'Young Adult',
  'Philosophical Fiction',
];

const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    category: '',
    image: null,
    rating: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBook({ ...book, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      ...book,
      id: Date.now(),
      coverImage: book.image ? URL.createObjectURL(book.image) : null,
      genre: book.category,
    };

    // Save to Redux store
    dispatch(addBook(newBook));

    // Save to local storage
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    storedBooks.push(newBook);
    localStorage.setItem('books', JSON.stringify(storedBooks));

    // Reset form
    setBook({
      title: '',
      author: '',
      description: '',
      price: '',
      category: '',
      image: null,
      rating: 0,
    });

    e.target.reset();

    // Redirect to BrowseBooks page
    navigate('/browse-books');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a New Book</h2>
        <input name="title" placeholder="Title" value={book.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={book.description} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={book.price} onChange={handleChange} required />

        {/* Dropdown for Categories */}
        <div className="cat_dropdown">
          <label htmlFor="cat_select">Category:</label>
          <select id="cat_select" name="category" value={book.category} onChange={handleChange} required>
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image-upload">Upload Image:</label>
          <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} required />
        </div>

        <div className="rating">
          <label>Rating:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= book.rating ? 'active' : ''}`}
                onClick={() => setBook({ ...book, rating: star })}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
