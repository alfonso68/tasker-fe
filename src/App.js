import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ApolloProvider from './ApolloProvider';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

function App() {
  return (
    <ApolloProvider>
      <div>
        <h1>Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </ApolloProvider>
  );
}

export default App;
