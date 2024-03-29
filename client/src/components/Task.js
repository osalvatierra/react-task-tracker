import { FaTimes } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import axios from "axios";

const client = axios.create({
  baseURL: "https://react-task-tracker-server.onrender.com" 
});

const Task = ({ task, fetchTasks, deleteTask, toggleReminder }) => {
   // Fetch Task, singular w/ Axios
   const singular = async () => await axios.get(`https://react-task-tracker-server.onrender.com/tasks/${task._id}` ).then(res => res.data);

  (async () => {
    console.log( await singular())
  })();   
  const deleteT = async (e) => {
    client.delete(`https://react-task-tracker-server.onrender.com/tasks/${task._id}` ).then(res => {
      // Update State with new Task List
        (async () => {
          const tasksFromServer = await fetchTasks();
          deleteTask(tasksFromServer);
        })(); 
    })   
  }

    const reminderToggle = async () => {
      const taskToToggle = await singular();
      let upDTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
      
      client.post(`/update/${task._id}`, upDTask)
      .then(res => {
        (async () => {
          const tasksFromServer = await fetchTasks();
          toggleReminder(tasksFromServer);
        })();        
      }).catch((err) => {
        console.log(err);
        return;
      });
    }

  return (

    <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={reminderToggle}>
        <h3>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={deleteT}      /> </h3>
        <p>{task.day}</p>
        <p><Link to={`/tasks/${task._id}`} >View Details</Link></p>
        
    </div> 


  )
}

export default Task