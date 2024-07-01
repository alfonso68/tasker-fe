import React, { useEffect, useState } from 'react';
import { auth } from './components/firebase';
import ApolloProvider from './ApolloProvider';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import LogoutButton from './components/LogoutButton';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <div>
      {user ? (
        <ApolloProvider>
          <LogoutButton />
          <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
            <TaskList />
          </div>
        </ApolloProvider>
      ) : (
        <div className="max-w-6xl mx-auto p-8">
          <div className="p-4 bg-white shadow rounded-lg">
          <ul className="space-y-4">
            <li className="p-4 bg-gray-50 rounded-lg shadow flex items-center justify-between">
              <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
              <Login />
            </li>
            <li className="p-4 bg-gray-50 rounded-lg shadow flex items-center justify-between">
              <h1 className="text-3xl font-bold text-center mb-8">Register</h1>
              <Register />
            </li>
          </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
