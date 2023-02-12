import Task from './Task';

const Tasks = ({tasks, fetchTasks, deleteTask, toggleReminder}) => {

  return (
    <>
    {tasks.map((task, index) => (
        <Task key={index} task={task} fetchTasks={fetchTasks} deleteTask={deleteTask} toggleReminder={toggleReminder}/>
    ))}
    </>
  )
}

export default Tasks