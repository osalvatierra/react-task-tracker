import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation} from "react-router-dom";
import Button from "./Button";

function TaskDetails() {
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    const { pathname } = useLocation();
    
    useEffect(() => {
        const params = useParams();
        const navigate = useNavigate();
        const fetchTask = async (id) => {
            const res = await fetch(`https://sick-badge-production.up.railway.app/tasks/${params.id}`)
            const data = await res.json()
            
            if(res.status === 404 ) {
                navigate('/')
            }
            console.log(data)
            setTask(data)
            setLoading(false)
        }
        fetchTask()
    }, []) 

    return loading ? (
        <h3>loading...</h3>
    ) : (
        <div>
            <p>{pathname}</p>
            <h3>{task.text}</h3>
            <p>{task.day}</p>
            
            <Button onClick={() => {
                navigate(-1)
            }} text='Go Back' />
        </div>
    )
}
export default TaskDetails;