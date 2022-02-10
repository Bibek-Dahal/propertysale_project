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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
