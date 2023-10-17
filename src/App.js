import './App.css';
import TaskForm from './TaskForm';
import Task from './Task.js';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    if (tasksFromLocalStorage) {
      setTasks(tasksFromLocalStorage);
    }
  }, []);

  function addTask(name) {
    setTasks((prev) => [...prev, { name: name, done: false }]);
  }

  function removeTask(indexToRemove) {
    setTasks((prev) => prev.filter((taskObject, index) => index !== indexToRemove));
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = (numberTotal === 0) ? 0 : (numberComplete / numberTotal) * 100;

    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }

    if (percentage === 100) {
      return 'Nice job for today! 🏝️';
    }

    return 'Keep it going 💪';
  }

  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  return (
    <main>
      <h1>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task
          key={index}
          {...task}
          onRename={(newName) => renameTask(index, newName)}
          onDelete={() => removeTask(index)}
          onToggle={(done) => updateTaskDone(index, done)}
        />
      ))}
    </main>
  );
}

export default App;
