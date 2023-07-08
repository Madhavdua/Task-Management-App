import { React, useContext } from 'react'
import noteContext from '../context/Createcontext'
import Navbar from './Navbar'
const About = () => {
  const c= useContext(noteContext)
  return (
    <>
      <>
      <Navbar/>
      <div>About</div>
      
      </>
    </>
  )
}

export default About