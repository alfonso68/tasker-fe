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
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">New Task</h2>
      <AddTask refetchTasks={refetch} /> {}
      <ul className="space-y-4">
      <br/>
      <h2 className="text-xl font-semibold mb-4">Task List</h2>
        {data.getTasks.map((task) => (
          <li key={task.id} className="p-4 bg-gray-50 rounded-lg shadow flex items-center justify-between">
            {editingTaskId === task.id ? (
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                  className="border p-2 rounded"
                />
                <button onClick={() => handleUpdateClick(task.id)} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                <button onClick={() => setEditingTaskId(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            ) : (
              <div className="flex space-x-4 items-center">
                <strong>{task.title}</strong>: {task.description} - {task.dueDate} - {task.isCompleted ? 'Completed' : 'Pending'}
                <button onClick={() => handleEditClick(task)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={() => handleDeleteClick(task.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                <button
                  onClick={() => handleStatusToggleClick(task)}
                  className={`px-4 py-2 rounded ${
                    task.isCompleted ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'
                  }`}
                >
                  {task.isCompleted ? 'Set Pending' : 'Set Complete'}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
