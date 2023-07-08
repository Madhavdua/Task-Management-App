import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/Createcontext'
import TaskItem from './TaskItem';

const Tasks = (props) => {
  const c = useContext(noteContext);
  const {adder}=props;

  const { tasks, setTasks,fetchAssTasks, fetchTasks,editTask,editAssTask } = c

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      adder=="admin"?fetchAssTasks():fetchTasks();
    }
    // eslint-disable-next-line
  }, [])


  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: ""
  })

  const ref = useRef(null);
  const openModal = (id,tit,des,due_date) => {
    ref.current.click();
    setTask({
      id:id,
      title:tit,
      description:des,
      due_date:due_date
    })
  }

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value })
  }


  const handleSubmit =async (e) => {
    e.preventDefault();
    if(adder=="user"){
      await editTask(task.id,task.title, task.description, task.due_date);
    }
    else {
    await editAssTask(task.id,task.title, task.description, task.due_date);
  }
    ref.current.click();
  }


  let head="Your Tasks"
  if(adder=="admin"){
    head="Assigned Tasks"
  }

  if (!tasks || tasks.length === 0) return <div className='container'><h5>No Tasks Found</h5></div>
  return (
    <>
    
    <div className='my-4'>

      <h2 className='text-center'>{head}</h2>
      {/* start modal */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="container my-3">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                  <input type="text" className="form-control" placeholder='Enter a title of atleast 3 charachter' name='title' onChange={onChange} value={task.title}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
                  <input type="text" className="form-control" name='description' placeholder='Enter a description of atleast 5 charachter' onChange={onChange} value={task.description}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Due date</label>
                  <input type="date" className="form-control" name='due_date' placeholder='Write comments here' onChange={onChange} value={task.due_date}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {/* end modal */}
    <div className='d-flex flex-wrap' style={{alignItems:"center", justifyContent:"center"}}>

      {tasks.length>0 && tasks.map((element) => {
        return <div key={element._id} className="d-flex flex-wrap" style={{width:"auto"}}> <TaskItem task={element} openModal={openModal} adder={adder} /></div>
      })}
    </div>
      
    </div>
    </>
  )
}

export default Tasks