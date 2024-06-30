import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ApolloProvider from './ApolloProvider';
import TaskList from './components/TaskList';

function App() {
  return (
    <ApolloProvider>
      <div>
        <h1>Task Manager</h1>
        <TaskList />
      </div>
    </ApolloProvider>
  );
}

export default App;
