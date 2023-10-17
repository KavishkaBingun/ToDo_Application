import {useState}   from "react";

function TaskForm({onAdd}){
    const[TaskName, setTaskName] = useState(" ");
    function handleSubmit(ev){
      ev.preventDefault();
      onAdd(TaskName);
      setTaskName(" ");

    }
    return(
        <div>
        <form className="form" onSubmit={handleSubmit}>
          <button id="btntask">+</button>
          <input id="inputtask" 
          type='text' 
          placeholder="Your Next Task..."
          value={TaskName}
          onChange={ev => setTaskName(ev.target.value)}
          ></input>
        </form>
      </div>
    )
}
export default TaskForm;