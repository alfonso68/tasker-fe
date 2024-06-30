import React from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logout successful');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
