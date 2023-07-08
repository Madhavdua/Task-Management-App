import { useEffect, useState } from "react";
import noteContext from '../context/Createcontext'

const Note = (props) => {
  // for login status
  const [loggedIn, setLoggedIn] = useState(false);
  const [username,setUsername]=useState('');

  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (msg != '') {
      setAlert(true)
      setTimeout(() => {
        setAlert(false);
        setMsg('');
      }, 2000);
    }
  }, [msg])


  const [tasks, setTasks] = useState([])
  const host = "http://127.0.0.1"

  const noBodyReq = async (route, method) => {
    let url = `${host + route}`;
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem('token')}`
      }
    })
    let result = await response.json()
    return result;
  }

  const bodyReq = async (route, method, body) => {
    let url = `${host + route}`;
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem('token')}`
      },
      body: body
    })
    // let result=await response.json()
    return response;
  }

  const fetchTasks = async () => {
    let route = '/api/task/fetchtasks'
    let result = await noBodyReq(route, 'GET');
    setTasks(result);
  }
  const fetchAssTasks = async () => {
    let route = '/api/task/fetchasstasks'
    let result = await noBodyReq(route, 'GET');
    setTasks(result);
  }


  // *******
  const addTask = async (title, description, due_date) => {
    let route = '/api/task/addtask';
    let data = JSON.stringify({ title: title, description: description, due_date: due_date });
    
    let res=await bodyReq(route, 'POST', data);
    if(res.status==200){
      setMsg("Task added successfully")
    }
    else {
      setMsg("Cannot add task")
    }
    fetchTasks();
  }
  const assignTask = async (title, description, due_date) => {
    let route = '/api/task/assigntask';
    let data = JSON.stringify({ title: title, description: description, due_date: due_date });

    let res=await bodyReq(route, 'POST', data);
    if(res.status==200){
      setMsg("Task added successfully")
    }
    else {
      setMsg("Cannot add task")
    }
    fetchAssTasks();
  }


  // ****
  const deleteTask = async (id) => {
    let route = `/api/task/deletetask/${id}`;
    await noBodyReq(route, 'DELETE');
    fetchTasks();
  }
  const deleteAssTask = async (id) => {
    let route = `/api/task/deleteasstask/${id}`;
    await noBodyReq(route, 'DELETE');
    fetchAssTasks();
  }

  // ****** 
  const editTask = async (id, title, description, due_date) => {
    let route = `/api/task/updatetask/${id}`;
    let data = JSON.stringify({ title: title, description: description, due_date: due_date });
    
    await bodyReq(route, 'PUT', data);
    fetchTasks();

  }
  const editAssTask = async (id, title, description, due_date) => {
    let route = `/api/task/updateasstask/${id}`;
    let data = JSON.stringify({ title: title, description: description, due_date: due_date });

    await bodyReq(route, 'PUT', data);
    fetchAssTasks();

  }





  const toggleSubmit=async (status,id)=>{
    let route = `/api/task/submit/${id}`;
    let data = JSON.stringify({status:status});

    await bodyReq(route, 'PUT', data);
    fetchTasks();
  }

  const toggleAssSubmit=async (status,mail,id)=>{
    let route = `/api/task/asssubmit/${id}/${mail}`;
    let data = JSON.stringify({status:status});

    await bodyReq(route, 'PUT', data);
    fetchTasks();
  }

  // Auth context




  const apiCall = async (route, body) => {
    let url = `${host + route}`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
    let json = await response.json();
    let arr = [];
    if (json.success === true) {
      localStorage.setItem('token', json.authToken);
    }
    else {
      arr.push(json.error)
    }
    return arr;
  }

  const login = async (mail, password) => {
    localStorage.setItem('name',mail);
    setUsername(mail)
    let route = '/api/auth/login';
    const body = JSON.stringify({ mail: mail, password: password });
    return await apiCall(route, body);
  }
  
  const signUp = async (name, mail, password) => {
    setUsername(mail)
    let route = '/api/auth/createUser';
    const body = JSON.stringify({ name: name, mail: mail, password: password });
    return await apiCall(route, body);
  }
  const adminlogin=async(mail,password)=>{
    setUsername(mail)
    localStorage.setItem('name',mail);

    let route = '/api/admin/adminlogin';
    const body = JSON.stringify({ mail: mail,password: password });
    return await apiCall(route, body);
  }


  return (
    <>
      <div>
        < noteContext.Provider value={{ tasks, setTasks, login, signUp, loggedIn, setLoggedIn, addTask, msg, setMsg, alert,fetchTasks,editTask,deleteTask,username,setUsername,toggleSubmit ,adminlogin,assignTask,fetchAssTasks,toggleAssSubmit, deleteAssTask,editAssTask}} >
          {props.children}
        </noteContext.Provider >

      </div>
    </>

  )
}
export default Note;