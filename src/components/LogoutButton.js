import React from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded float-right">Logout</button>
  );
};

export default LogoutButton;
