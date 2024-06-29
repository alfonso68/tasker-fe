import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

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

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createTask] = useMutation(CREATE_TASK);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({ variables: { input: { title, description, dueDate } } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <label>Due Date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value.toString())}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
