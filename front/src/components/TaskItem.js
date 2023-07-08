import React, { useContext } from 'react'
import noteContext from '../context/Createcontext';

const TaskItem = (props) => {

    const { task, openModal, adder } = props
    const c = useContext(noteContext);
    const { deleteTask, deleteAssTask } = c;
    const remove = () => {
        if (adder == "user") {
            deleteTask(task._id);
        }
        else {
            deleteAssTask(task._id);
        }
    }
    const update = () => {
        openModal(task._id, task.title, task.description, task.due_date);
    }



    const sample_date = task.due_date;
    const dateObj = new Date(sample_date);
    let final_date = dateObj.toDateString().slice(0, -4);
    let today = new Date();
    let days_left = dateObj.getDate() - today.getDate()
    let status = task.status;
    let symbol = status === true ? 'Unmark done' : 'Mark done'


    if (adder === "user" && task.assigned === true) {
        const user = task.userslist;
        user.forEach(element => {
            if (element.mail === c.username) {
                status = element.done;
                symbol = status === true ? 'Mark as pending' : 'Mark as done'
            }
        });
    }
    let userlist = task.userslist;

    let badge = task.assigned ? "Assigned" : "Personal";

    return (
        <>

            <div className="card mx-3 my-2" style={{ minWidth: "320px", width: "100%", maxWidth: "90vw" }}>

                {/* badge */}
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning">
                    {badge}
                    <span className="visually-hidden">unread messages</span>
                </span>


                <div className="card-body border-top border-primary border-5" >
                    <div className='d-flex flex-wrap' style={{ justifyContent: "space-between" }}>

                        <p className="card-title multicolor-text" style={{ fontSize: "4vh", fontWeight: "bold" }}> {task.title}</p>
                        {!status && <p className="card-text mx-2 " style={{ fontSize: "2vh", fontWeight: "500", marginTop: "auto", marginBottom: "auto" }}>{final_date} ({Math.abs(days_left)} {days_left >= 0 ? `days left` : `day late`})</p>}
                    </div>
                    <p className="card-text " style={{ fontSize: "3vh", fontWeight: "500" }}>{task.description}</p>
                    {adder == "user" && <p className={`card-text text-${status ? "success" : "danger"}`} style={{ fontSize: "3vh" }}>Status : {status ? "Completed" : "Pending"}</p>}

                    {adder == "admin" && <div className="dropdown my-3 " >
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Users
                        </a>
                        <ul className="dropdown-menu">

                            {userlist.map((element) => {
                                return <div key={userlist.indexOf(element)}>
                                    <li className="list-group-item d-flex px-3 py-2" style={{ justifyContent: "space-between" }}>

                                        <p className='mx-1'>{element.mail}</p>
                                        <p className={`mx-1 text-${element.done ? 'success' : 'danger'}`}>&#9673;</p>
                                    </li>
                                </div>
                            })}
                            {/* <li><hr className="dropdown-divider"/></li> */}
                            {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                        </ul>
                    </div>}
                    <div>

                        {/* icons for user task */}
                        {adder === "user" && !task.assigned && <button onClick={update} className='border-0 mx-2  py-1'><i className="fa-solid fa-pen-to-square mx-2" style={{ cursor: "pointer" }} ></i></button>}
                        {adder === "user" && !task.assigned && <button onClick={remove} className='border-0 mx-2 py-1 '>

                            <i className="fa-solid fa-trash-can mx-2" style={{ cursor: "pointer" }} ></i>
                        </button>}


                        {/* icons for admin/assigned task */}
                        {adder === "admin" && task.assigned && <button onClick={update} className='border-0 mx-2  py-1'><i className="fa-solid fa-pen-to-square mx-2" style={{ cursor: "pointer" }} ></i></button>}
                        {adder === "admin" && task.assigned && <button onClick={remove} className='border-0 mx-2 py-1 '>

                            <i className="fa-solid fa-trash-can mx-2" style={{ cursor: "pointer" }} ></i>
                        </button>}

                        {/*  below submit button if to mark my own task*/}
                        {adder === "user" && !task.assigned && <button type="button" className="btn btn-outline-primary border-2 py-1 mx-3 my-0" style={{ marginLeft: "auto" }} onClick={() => { c.toggleSubmit(task.status, task._id) }}>
                            {symbol}
                        </button>}

                        {/* below submit is use to mark my task in assigned task */}
                        {adder === "user" && task.assigned && <button type="button" className="btn btn-outline-primary border-2 py-1 mx-3 my-0" style={{ marginLeft: "auto" }} onClick={() => { c.toggleAssSubmit(status, c.username, task._id) }}>
                            {symbol}
                        </button>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default TaskItem