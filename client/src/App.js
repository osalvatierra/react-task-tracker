import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react';
import axios from "axios";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

function App() {
const [showAddTask, setShowAddTask] = useState(false);
const [tasks, setTasks ] = useState([]);  
const getTasks = async () => {
  const tasksFromServer = await fetchTasks();
  setTasks(tasksFromServer)
}

useEffect(()=> {
  getTasks();
}, [])


// Fetch Tasks
const fetchTasks = async () => await axios.get('https://react-task-tracker-server.onrender.com/tasks')
.then(res => {
   console.log(res.data) 
    return res.data;
  })
  .catch(error => {
    console.log(error);
  });
  fetchTasks();

//Rewriting Fetch
// async getData() {
//   const res = axios.get('https://react-task-tracker-server.onrender.com/tasks');
//   const {data} = await res;
  
// }  

//Updating State. Passing Props from Add Component
const addTask = (newTasks) => {
     setTasks(newTasks);
    console.log(newTasks)
}
 
//Updating State. Delete Task
const deleteTask = (deleteT) => {
  setTasks(deleteT);
}
   
//Updating State. toggle reminder
const toggleReminder = async (tasksFromServer) => {
  setTasks(tasksFromServer)
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask} />
         
      <Routes>
        <Route 
          path="/" 
          element ={
            <>
            {showAddTask && <AddTask addTask={addTask} fetchTasks={fetchTasks}/>}
            {tasks.length > 0 ? 
            <Tasks 
              tasks={tasks}
              fetchTasks={fetchTasks}
              deleteTask={deleteTask} 
              toggleReminder={toggleReminder} /> : 'No Tasks To Show.'}
            </>
          }/>

      <Route path='/tasks/:id' element={<TaskDetails />} />
      <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
