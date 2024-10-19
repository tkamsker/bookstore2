import React, { useState } from 'react';
import { Book } from '../App';

interface BookListProps {
  books: Book[];
  addToCart: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(books.map(book => book.category))];

  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter(book => book.category === selectedCategory);

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">Filter by category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded p-1"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-sm text-gray-500">{book.category}</p>
            <p className="mt-2 font-bold">${book.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(book)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;