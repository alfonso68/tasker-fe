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
          <div>
            <h1>Task Manager</h1>
            <TaskList />
          </div>
        </ApolloProvider>
      ) : (
          <>
            <h2>Login</h2>
            <Login />
            <h2>Register</h2>
            <Register />
          </>
      )}
    </div>
  );
}

export default App;
