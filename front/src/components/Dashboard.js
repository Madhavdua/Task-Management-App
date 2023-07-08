import React,{useContext, useEffect} from 'react'

import Addtask from './Addtask'
import Tasks from './Tasks'
import Alert from './Alert';
import Navbar from './Navbar';
import noteContext from '../context/Createcontext';
import bgLogin from './bgLogin.jpg'
import Welcome from './Welcome'


function Dashboard() {
    useEffect(() => {
      if(localStorage.getItem('token')){
        setLoggedIn(true);
        c.setUsername(localStorage.getItem('name'))
      }
    }, [])
    

    const c = useContext(noteContext)
    const { loggedIn, setLoggedIn } = c;
    return (

        <>
            <div style={{ backgroundImage: `url(${bgLogin})`, minHeight: "100vh" }}>
            {!loggedIn &&  <Welcome/>}
                {loggedIn && <Navbar />}
                {c.alert && <Alert />}
                {loggedIn && <div className='container my-4 ' style={{ textAlign: "center" }}><h5>You can assign task here:</h5></div>}
                <div className='d-flex flex-wrap mx-3 flex-column' style={{ justifyContent: "center", alignItems: "center" }} >
                    {loggedIn && <Addtask adder={"admin"}/>}
                    {loggedIn && <Tasks adder="admin"/>}

                </div>

            </div>

        </>
    )
}

export default Dashboard
