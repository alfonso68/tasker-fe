import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

const editTask = (id) => {
  
}

const TaskList = ({ isCompleted }) => {
  const { loading, error, data } = useQuery(GET_TASKS, {
    variables: { isCompleted },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {data.getTasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} - {task.isCompleted ? "Completed" : "Pending"} <input type='button' value='Edit' key={task.id} onClick={() => editTask(task.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
