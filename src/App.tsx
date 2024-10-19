import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import Cart from './components/Cart';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<Book[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/books');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please make sure the server is running and try again.');
    }
  };

  const addToCart = async (book: Book) => {
    try {
      const response = await fetch('http://localhost:3001/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setCart([...cart, book]);
    } catch (error) {
      console.error('Error adding book to cart:', error);
      setError('Failed to add book to cart. Please try again.');
    }
  };

  const removeFromCart = async (bookId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cart/${bookId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setCart(cart.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error removing book from cart:', error);
      setError('Failed to remove book from cart. Please try again.');
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user.username);
        setShowLogin(false);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setShowDashboard(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        cartItemCount={cart.length}
        user={user}
        onCartClick={() => setShowCart(true)}
        onLoginClick={() => setShowLogin(true)}
        onDashboardClick={() => setShowDashboard(true)}
        onLogout={handleLogout}
      />
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <BookList books={books} addToCart={addToCart} />
      </main>
      {showCart && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          onClose={() => setShowCart(false)}
        />
      )}
      {showLogin && (
        <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}
      {showDashboard && user && (
        <Dashboard user={user} onClose={() => setShowDashboard(false)} />
      )}
    </div>
  );
};

export default App;