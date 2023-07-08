import React, { useState, useContext, useEffect } from 'react'
import Alert from './Alert'
import noteContext from '../context/Createcontext'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import bgLogin from './bgLogin.jpg'

const SignUp = () => {
  // for alerts

  const navigate = useNavigate();
  const c = useContext(noteContext);

  const [cred, setCred] = useState({
    name: "",
    mail: "",
    password: "",
    confirmPassword: ""
  })
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cred.password !== cred.confirmPassword) {
      console.log("enter correct password");
      // giving alert
      c.setMsg("Password does not match");
    }
    else {
      let result = await c.signUp(cred.name, cred.mail, cred.password);
      if (result.length === 0) {
        c.setLoggedIn(true);
        navigate('/');
      }
      else {
        c.setMsg(result);
      }
    }
  }
  return (
    <>
      <div className='complete_screen d-flex justify-content-center align-items-center'style={{backgroundImage: `url(${bgLogin})` ,backgroundRepeat: "no-repeat", height:"99vh"}}>
      <div className=' login_box containerrounded py-4 px-3 rounded' style={{backgroundColor:"white", height:"80%", width:"auto"}} >



    {c.alert && <Alert/>}
        <div className="mb-3 row my-2 d-flex flex-column fw-semibold" style={{fontSize:"12px"}}>
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label mx-3">Name</label>
          <div className="col-sm-10">
            <input type="text" className="fs-6 form-control-plaintext mx-3 px-1 border-bottom" placeholder="Username" name='name' onChange={onChange} style={{ fontFamily: 'Kanit' }} />
          </div>
        </div>
        <div className="mb-3 row my-2 d-flex flex-column fw-semibold" style={{fontSize:"12px"}}>
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label mx-3">Email</label>
          <div className="col-sm-10">
            <input type="text" className="fs-6 form-control-plaintext mx-3 px-1 border-bottom" placeholder="email@example.com" name='mail' onChange={onChange} style={{ fontFamily: 'Kanit' }} id="staticEmail" />
          </div>
        </div>
        <div className="mb-3 row my-2 d-flex flex-column fw-semibold" style={{fontSize:"12px"}}>
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label mx-3">Password</label>
          <div className="col-sm-10">
            <input type="password" name='password' onChange={onChange} className="fs-6 form-control-plaintext mx-3 px-1 border-bottom" placeholder="Enter password" style={{ fontFamily: 'Kanit' }}/>
          </div>
        </div>
        <div className="mb-3 row my-2 d-flex flex-column fw-semibold" style={{fontSize:"12px"}}>
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label mx-3">Confirm Password</label>
          <div className="col-sm-10">
            <input type="password"className="fs-6 form-control-plaintext mx-3 px-1 border-bottom" placeholder="Enter password" onChange={onChange} style={{ fontFamily: 'Kanit' }} id="inputPassword" name='confirmPassword' />
          </div>
        </div>
        <div className="col-auto text-center my-4">
          <button type="submit" className="btn btn-primary border-0 " style={{width:"20vw",color:"rgb(64, 63, 61)", backgroundImage: `url(${bgLogin})`}} onClick={handleSubmit}>SignUp</button>
        <div className="havent mx-5 my-3" style={{color:"grey" ,fontSize:"14px"}}><Link to="/login" className=" text-decoration-none" style={{color:"black", fontSize:"14px"}}>Login</Link></div>
      </div>
        </div>
      </div>
    </>
  )
}

export default SignUp