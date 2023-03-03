import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import Button from "./Button";

function TaskDetails() {
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    const params = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    console.log(params)
    useEffect(() => {
        // Fetch singular w/ Axios
        const singular = async (id) => await axios.get(`https://sick-badge-production.up.railway.app/tasks/${params.id}` ).then(res => {
            setTask(res.data)
            setLoading(false)
            return res.data;
        });
        singular()
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