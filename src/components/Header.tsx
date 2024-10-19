import React from 'react';
import { BookOpen, ShoppingCart, User } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  user: string | null;
  onCartClick: () => void;
  onLoginClick: () => void;
  onDashboardClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  user,
  onCartClick,
  onLoginClick,
  onDashboardClick,
  onLogout,
}) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <BookOpen className="mr-2" />
          <h1 className="text-2xl font-bold">Online Bookstore</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button onClick={onCartClick} className="flex items-center">
                <ShoppingCart className="mr-1" />
                Cart ({cartItemCount})
              </button>
            </li>
            {user ? (
              <>
                <li>
                  <button onClick={onDashboardClick} className="flex items-center">
                    <User className="mr-1" />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={onLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={onLoginClick}>Login</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;