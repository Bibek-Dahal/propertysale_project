import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Modal from './components/Modal/Modal';
import {usePopup} from './Hooks/index';
import {Login, PasswordReset,Register,User,Home,PasswordResetConfirm} from './components/index'

// import Home from './components/Home/Home';
// import User from './components/User/User';
import PrivateRoute from './components/utils/PrivateRoute';
import Logout from './components/Auth/Logout';
import ProtectedRoute from './components/utils/ProtectedRoute';
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
          <Route path = "/login" element = {
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }/>
          <Route path = "/logout" element = {<Logout />}/>
          <Route path = "/register" element = {
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
          }/>
          <Route path = "/password-reset" element = {<PasswordReset />} />
          <Route path = "/password-reset/confirm/:uid/:token" element = {<PasswordResetConfirm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
