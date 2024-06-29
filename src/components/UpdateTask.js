import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskDto!) {
    updateTask(input: $input) {
      id
      title
      description
      isCompleted
    }
  }
`;

const UpdateTask = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask({
      variables: {
        input: { id: task.id, title, description, isCompleted },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
        />
      </label>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default UpdateTask;
