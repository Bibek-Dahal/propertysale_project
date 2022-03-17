import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Modal from './components/Modal/Modal';
import {usePopup} from './Hooks/index';
import {Login, PasswordReset} from './components/index'
import {Register} from './components/index';
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
          <Route path = "/password-reset" element = {<PasswordReset />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
