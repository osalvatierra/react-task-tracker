import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const client = axios.create({
  baseURL: "https://react-task-tracker-orpin.vercel.app" 
});

const AddTask = ({addTask, fetchTasks, getTasks}) => {
    const [form, setForm] = useState({
        text: "",
        day: "",
        reminder: false,
      });   
      const navigate = useNavigate();
      
      function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
      }

      // useEffect(()=> { 
      //   console.log(form);
      // }, [form]);

      function handleClick(event) {
        event.preventDefault();

        //validation
        if(!form.text || !form.day ) {
          alert("Please add task");
          setForm({ text: "", day: "", reminder: false });
          return;
        }

        const newTask = {
          text: form.text,
          day: form.day,
          reminder: form.reminder,
        }
        
        client.post('https://react-task-tracker-orpin.vercel.app/tasks/add', newTask)
        .then(res => {
          // Fetch Tasks
          (async () => {
            const tasksFromServer = await fetchTasks();
            addTask(tasksFromServer);
          })();
      
        }).catch((err) => {
          console.log(err);
          return;
        })
        setForm({
          text: "",
          day: "",
          reminder: false,
        })
      }


  return (
    <form className="add-form">
        <div className="form-control">
            <label>Task</label>
            <input type='text' placeholder="Add Task" value={form.text} onChange={(e)=> updateForm({ text: e.target.value })}/>
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input type='text' placeholder="Add Day & Time" value={form.day} onChange={(e)=> updateForm({ day: e.target.value })} />
        </div>
        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input type='checkbox' checked={form.reminder} value={form.reminder} onChange={(e)=> updateForm( { reminder: e.currentTarget.checked })} />
        </div>

        <input type='submit' value='Save Task' className="btn btn-block" onClick={handleClick} />
    </form>
  )
}

export default AddTask
 