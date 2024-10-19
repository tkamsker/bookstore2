import React from 'react';
import { X } from 'lucide-react';

interface DashboardProps {
  user: string;
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <p>Welcome, {user}!</p>
        <p>This is your dashboard. Here you can view your order history, manage your account, and more.</p>
        {/* Add more dashboard features here */}
      </div>
    </div>
  );
};

export default Dashboard;