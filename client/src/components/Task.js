import { FaTimes } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from "axios";


const Task = ({ task, fetchTasks, deleteTask, toggleReminder }) => {
  // Fetch Task, singular
  const fetchTask = async () => {
    const res = await fetch(`/tasks/${task._id}`)
    const data = await res.json();
    console.log(data)
    return data
  }

  const deleteT = async (e) => {
    e.preventDefault();
    await axios.delete(`/tasks/${task._id}` ).then(res => {
      // Update State with new Task List
        (async () => {
          const tasksFromServer = await fetchTasks();
          deleteTask(tasksFromServer);
        })();
    })   
  }

    const reminderToggle = async (e) => {
      e.preventDefault();
      const taskToToggle = await fetchTask();
      let upDTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
      
      await axios.post(`/update/${task._id}`, upDTask).then(res => {
        console.log(res)
        
        const getTasks = async () => {
          const tasksFromServer = await fetchTasks();
          toggleReminder(tasksFromServer)
        }; getTasks();
        
      }).catch((err) => {
        console.log(err);
        return;
      });
    }

  return (

    <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={reminderToggle}>
        <h3>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} 
        onClick={deleteT}      /> </h3>
        <p>{task.day}</p>
        <p><Link to={`/tasks/${task._id}`} >View Details</Link></p>
        
    </div> 


  )
}

export default Task