import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import AddTask from './AddTask';

// GraphQL Queries and Mutations
const GET_TASKS = gql`
  query GetTasks($isCompleted: Boolean) {
    getTasks(isCompleted: $isCompleted) {
      id
      title
      description
      dueDate
      isCompleted
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskDto!) {
    updateTask(input: $input) {
      id
      title
      description
      dueDate
      isCompleted
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id)
  }
`;

const TaskList = ({ isCompleted }) => {
  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: { isCompleted },
  });

  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '', dueDate: '' });

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({ title: task.title, description: task.description, dueDate: task.dueDate });
  };

  const handleUpdateClick = async (id) => {
    await updateTask({
      variables: {
        input: {
          id,
          title: editedTask.title,
          description: editedTask.description,
          dueDate: editedTask.dueDate,
        },
      },
    });
    setEditingTaskId(null);
    refetch();
  };

  const handleDeleteClick = async (id) => {
    await deleteTask({ variables: { id } });
    refetch();
  };

  const handleStatusToggleClick = async (task) => {
    await updateTask({
      variables: {
        input: {
          id: task.id,
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          isCompleted: !task.isCompleted,
        },
      },
    });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return (
    <div>
      <h2>Task List</h2>
      <AddTask refetchTasks={refetch} /> {}
      <ul>
        {data.getTasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                />
                <input
                  type="text"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                />
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                />
                <button onClick={() => handleUpdateClick(task.id)}>Update</button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{task.title}</strong>: {task.description} - {task.dueDate} - {task.isCompleted ? 'Completed' : 'Pending'}
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => handleDeleteClick(task.id)}>Delete</button>
                <button onClick={() => handleStatusToggleClick(task)}>
                  {task.isCompleted ? 'Set Pending' : 'Set Complete'}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
