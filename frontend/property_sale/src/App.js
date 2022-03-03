import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Modal from './components/Modal/Modal';
import usePopup from './Hooks/usePopup';
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register';
import Home from './components/Home/Home';
import User from './components/User/User';
import PrivateRoute from './components/utils/PrivateRoute';
import Logout from './components/Auth/Logout';


function App() {
  const {PopupVisible} = usePopup();
  
  return (
    <div className="App">
      <Modal/>
      <Router>
        <Routes>
          <Route path = "/" element = {
              <Home />
          } />
          <Route path = "/user" element = {
            <PrivateRoute>
              <User />
            </PrivateRoute>
          } />
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/logout" element = {<Logout />}/>
          <Route path = "/register" element = {<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
