import './App.css';
import Form from './Form/Form.jsx';
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
          <Route path="/" element={
            <>
              <h1>Hello home</h1>
            </>
          } />
          <Route path='/form/*' element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
