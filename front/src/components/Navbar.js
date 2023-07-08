import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import noteContext from '../context/Createcontext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const c = useContext(noteContext);
  const handleLogout = () => {
    navigate('/')
    localStorage.setItem('token', '');
    localStorage.setItem('name', '');
    c.setLoggedIn(false);
  }
  const {username}=c;

  return (
    <>
      <nav className="navbar navbar-expand navbar bg-dark bg-body-tertiary" data-bs-theme="dark" >
        <div className="container-fluid" >
          <Link className="navbar-brand" to="/">{username}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <form className="d-flex" role="search">
            <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
          </form>
          {/* </div> */}
        </div>
      </nav>
    </>
  )
}

export default Navbar
