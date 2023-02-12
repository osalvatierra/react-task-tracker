import { FaTimes } from 'react-icons/fa';
import {Link} from 'react-router-dom';



const Task = ({ task, onDelete, onToggle }) => {
  if(task.tasks) {
  console.log(task.tasks[0])

  task.tasks.forEach(el => {
          console.log(el);
     })
  }
  let heading;


  //for each, loop f
  return (
    <div>
    
       {task.tasks && task.tasks.map(el => {
        return ( 
          <div className={`task ${el.reminder ? 'reminder': ''}`} onDoubleClick={()=>onToggle(el.id)}>
          <h1>{el.text}</h1>
          <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task._id)}/> 
          <p>{el.day}</p>
          <p><Link to={`/tasks/${task._id}`} >View Details</Link></p>
          </div>
        )
       })}
       
  </div>

        
    // </div> 


  )
}

export default Task