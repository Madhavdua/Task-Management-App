import './App.css';
import {
  HashRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import AdminLogin from './components/AdminLogin'
import Dashboard from './components/Dashboard';
import AllContext from './components/AllContext';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <>
      <AllContext>
        <Router>
          {/* <Navbar /> */}
          <Switch>
            <Route exact path='/' element={<Home />}></Route>
            {/* <Route exact path='/about' element={<About />}></Route> */}
            <Route exact path='/signup' element={<SignUp />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/adminlogin' element={<AdminLogin />}></Route>
            <Route exact path='/dashboard' element={<Dashboard />}></Route>
          </Switch>
        </Router>

      </AllContext> 



    </>
  );
}

export default App;
