import './App.css';
import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import './fontAwesome';
import PasswordReset from './PasswordReset/PasswordReset';
import Nav from './Nav/Nav';
import User from './User/User';
import Profile from './Profile/Profile';
import Kyc from './Kyc/Kyc';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path = "/user" element={<User/>}>
              <Route path = "profile" element={<Profile />}/>
              <Route path="kyc" element={<Kyc />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
