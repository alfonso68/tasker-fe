import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL Mutation
const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskDto!) {
    createTask(input: $input) {
      id
      title
      description
      isCompleted
    }
  }
`;

const AddTask = ({ refetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      refetchTasks();
      setTitle('');
      setDescription('');
      setDueDate('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({ variables: { input: { title, description, dueDate } } });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg space-y-4">
      <div>
        <label className="block text-gray-700">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="Title"
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="Description"
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
};

export default AddTask;
