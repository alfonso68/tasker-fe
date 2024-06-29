import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

const DeleteTask = ({ id }) => {
  const [deleteTask] = useMutation(DELETE_TASK);

  return (
    <button onClick={() => deleteTask({ variables: { id } })}>
      Delete Task
    </button>
  );
};

export default DeleteTask;
