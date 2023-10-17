import './App.css';
import TaskForm from './TaskForm';
import Task from './Task.js';
import { useEffect,useState } from 'react';



function App() {
  //component state (initialize tasks to empty array)
  const [tasks, setTasks] = useState([]);
  // useEffect hook for storing tasks in localStorage when tasks state changes
  useEffect(() => {
    if(tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks]);
// useEffect hook for retrieving tasks from localStorage when component mounts
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
  },[]) ;
// Function to add a new task
  function addTask(name){
    setTasks(prev => {
      return [...prev, {name:name, done:false}]
    })
  }
// Function to remove a task
  function removeTask(indexToRemove){
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove)
    })
  }
// Function to update the completion status of a task
   function updateTaskDone(taskIndex, newDone){
    setTasks(prev =>{
      const newTasks = [...prev];
      newTasks [taskIndex].done = newDone;
      return newTasks;
    })

   }
   // Calculate the number of completed and total tasks
   const numberComplete = tasks.filter(t => t.done).length;
   const numberTotal = tasks.length;
// Function to determine the message based on the completion percentage
   function getMessage(){
    const percentage = numberComplete/numberTotal*100;

    if(percentage === 0){
      return 'Try to do at least one! 🙏';
    }

    if(percentage === 100){
      return 'Nice job for today! 🏝️'
    }
    return 'Keep it going 💪'
     
   }
// Function to rename a task
function renameTask(index,newName){

  setTasks(prev => {
    const newTasks = [...prev];
    newTasks[index].name = newName;
    return newTasks;
  })
}

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask}/>
      {tasks.map((task,index )=> 
      <Task {...task} 
      onRename={newName => renameTask(index,newName)}
      onDelete={() => removeTask(index)}
      onToggle={done => updateTaskDone(index,done)}/>
        )}
      
      
 
      
      
    </main>
    
   
    

  );
}

export default App;
