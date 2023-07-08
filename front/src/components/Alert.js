import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/Createcontext'
const Alert = (props) => {
  const c=useContext(noteContext)
  return (
    <div className="alert alert-primary" role="alert">
   {c.msg}
</div>
  )
}

export default Alert