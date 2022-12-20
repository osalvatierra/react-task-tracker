import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react';
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";


function App() {
const [showAddTask, setShowAddTask] = useState(false)
const [tasks, setTasks ] = useState([])


useEffect(()=> {
  
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer)
  }

  getTasks();
}, [])

// Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('https://my-json-server.typicode.com/osalvatierra/tasks/tasks')
  const data = await res.json();
  
  return data
}

// Fetch Task, singular
const fetchTask = async (id) => {
  const res = await fetch(`https://my-json-server.typicode.com/osalvatierra/tasks/${id}`)
  const data = await res.json();
  
  return data
}

//Add Task
const addTask = async (task) => {

  const res = await fetch(`https://my-json-server.typicode.com/osalvatierra/tasks/tasks`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json();

  setTasks([...tasks, data])
  //  const id = Math.floor(Math.random() * 10000 ) + 1;
   
  //  const newTask = { id, ...task};
  //  setTasks([...tasks, newTask])
}

//Delete Task
const deleteTask = async (id) => {
  await fetch(`https://my-json-server.typicode.com/osalvatierra/tasks/${id}`, {
    method: 'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !== id ));
}
   
//toggle reminder
const toggleReminder = async (id) => {

  const taskToToggle = await fetchTask(id);
  const upDTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

  const res = await fetch(`https://my-json-server.typicode.com/osalvatierra/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(upDTask)

  })

  const data = await res.json();


  setTasks(
    tasks.map((task) => 
      task.id == id ? { ...task, reminder: data.reminder} : task))
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
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
            </>
          }/>

      <Route path='/task/:id' element={<TaskDetails />} />
      <Route path='/about' element={<About />} />

      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
