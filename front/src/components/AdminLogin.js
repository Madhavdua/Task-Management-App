import React, { useState, useContext } from 'react'
import noteContext from '../context/Createcontext'
import { useNavigate } from 'react-router-dom';
import bgLogin from './bgLogin.jpg'
import Alert from './Alert';
import { Link } from 'react-router-dom';
const AdminLogin = () => {
    const navigate = useNavigate();


    const c = useContext(noteContext);
    const [cred, setCred] = useState({
        mail: "",
        password: ""
    })
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await c.adminlogin(cred.mail, cred.password);
        if (result.length === 0) {
            c.setLoggedIn(true);

            navigate('/dashboard');
        }
        else {
            // giving alert
            c.setMsg(result)
        }
    }
    return (
        <>
            <div className='complete_screen d-flex justify-content-center align-items-center'style={{backgroundImage: `url(${bgLogin})` ,backgroundRepeat: "no-repeat", height:"99vh"}}>

                <div className='login_box containerrounded py-4 px-3 rounded' style={{backgroundColor:"white", height:"70vh", width:"auto"}} >
            {c.alert && <Alert/>}
                <div className='fs-4 fw-bold top text-center my-2  '>
                            Admin Login
                        </div>
                    <div className="mb-3 row my-2 d-flex flex-column fw-semibold" style={{fontSize:"12px"}}>
                        
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label mx-3">Email</label>
                        <div className="col-sm-10">
                            <input type="text" className="fs-6 form-control-plaintext mx-3 px-1 border-bottom" placeholder="email@example.com" name='mail' onChange={onChange} style={{ fontFamily: 'Kanit' }} />
                        </div>
                    </div>
                    <div className="mb-3 row my-4 d-flex flex-column fw-semibold" style={{fontSize:"12px"}}>
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label mx-3">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control-plaintext mx-3 px-1 border-bottom" id="inputPassword" name='password' onChange={onChange} placeholder='Type your password' />
                        </div>
                    </div>
                    <div className="col-auto text-center my-4">
                        <button type="submit" className="btn btn-primary border-0 " style={{width:"20vw",color:"rgb(64, 63, 61)", backgroundImage: `url(${bgLogin})`}} onClick={handleSubmit}>Login</button>
                    </div>
                    <div className="havent mx-5 my-2 text-center" style={{color:"grey" ,fontSize:"14px"}}> <Link to="/" className=" text-decoration-none" style={{color:"black", fontSize:"14px"}}>
                        <button className='btn border-0' style={{width:"20vw",color:"rgb(64, 63, 61)", backgroundColor:"#e8dfc5"}}>Home</button></Link></div>
                </div>
            </div>
        </>
    )
}
export default AdminLogin