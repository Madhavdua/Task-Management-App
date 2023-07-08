import React,{ useState,useContext,useEffect } from 'react'
import Addtask from './Addtask'
import Tasks from './Tasks';
import Alert from './Alert';
import Navbar from './Navbar';
import Welcome from './Welcome';
import noteContext from '../context/Createcontext';
import bgLogin from './bgLogin.jpg'


const Home = () => {
  const c=useContext(noteContext)
  const {loggedIn, setLoggedIn} = c;
  useEffect(() => {
    if(localStorage.getItem('token')){
      setLoggedIn(true);
      c.setUsername(localStorage.getItem('name'))
    }
  }, [])
  return (
    <>
    <div style={{backgroundImage: `url(${bgLogin})`, minHeight:"100vh"}}>

      {!loggedIn &&  <Welcome/>}
      {loggedIn &&  <Navbar/>}
      {c.alert && <Alert/>}
      {loggedIn &&  <div className='container my-4 ' style={{textAlign:"center"}}><h5>You can add task here:</h5></div>}
      <div className='d-flex flex-wrap mx-3 flex-column' style={{justifyContent:"center", alignItems:"center"}} >
      {loggedIn &&  <Addtask  adder={"user"}/>}
      {loggedIn &&   <Tasks adder={"user"}/>}

      </div>

    </div>
      
      

    </>
  )
}

export default Home