import React from 'react'
import { useState, useContext } from 'react'
import noteContext from '../context/Createcontext'
import Alert from './Alert';
import bgLogin from './bgLogin.jpg'


const Addtask = (props) => {
  const c = useContext(noteContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date:null
  })
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })

  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(props.adder=="admin"){
      let x=await c.assignTask(task.title,task.description,task.due_date);
    }
    else{
      let x=await c.addTask(task.title, task.description, task.due_date);
    }
    
  }

  return (

    <>
    <div style={{backgroundImage: `url(${bgLogin})`}}>

    <form className="container my-3 " style={{width:"max-content", minWidth:"40vw"}}>
      <div className="mb-3" >
        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
        <input type="text" className="form-control" placeholder='Enter a title of atleast 3 charachter' name='title' onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
        <input type="text" className="form-control" name='description' placeholder='Enter a description of atleast 5 charachter' onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label" >Due Date</label>
        <input type="date" className="form-control" name='due_date' placeholder='Select due date' onChange={onChange}/>
      </div>
      <button disabled={task.title.length<3 || task.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
    </div>
    
    </>
  )
}

export default Addtask