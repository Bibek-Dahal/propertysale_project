import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import './fontAwesome';

import Modal from './components/Modal/Modal';
import usePopup from './Hooks/usePopup';
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register';

function App() {
  const {PopupVisible} = usePopup();
  
  return (
    <div className="App">
      {PopupVisible ? <Modal /> : null}
      <Router>
        <Routes>
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/register" element = {<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
