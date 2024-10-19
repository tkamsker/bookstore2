import React from 'react';
import { Book } from '../App';
import { X } from 'lucide-react';

interface CartProps {
  cart: Book[];
  removeFromCart: (bookId: number) => void;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, onClose }) => {
  const total = cart.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-2">
              {cart.map(book => (
                <li key={book.id} className="flex justify-between items-center">
                  <span>{book.title}</span>
                  <div>
                    <span className="mr-2">${book.price.toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(book.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-2 border-t">
              <p className="font-bold">Total: ${total.toFixed(2)}</p>
            </div>
            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;