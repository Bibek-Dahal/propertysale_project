import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import Modal from './components/Modal/Modal';
import {usePopup} from './Hooks/index';
import {
  Login, 
  PasswordReset,
  Register,
  User,
  Home,
  PasswordResetConfirm,
  Profile,
  PostProperties,
  MyProperties,
  ChangePassword,
  PostLand,
  PostHouse
} from './components/index'

import PrivateRoute from './components/utils/PrivateRoute';
import Logout from './components/Auth/Logout';
import ProtectedRoute from './components/utils/ProtectedRoute';
import {PpContextProvider} from './context/PpContext';
import {ForeignKeyContextProvider} from './context/ForeignKeyContext';
import PublicRoute from './components/utils/PublicRoute';

function App() {
  const {PopupVisible} = usePopup();
  
  return (
    <div className="App">
      <Modal/>
      <Router>
        <Routes>
          <Route path = "/" element = {
            <PublicRoute>
              <Home />
            </PublicRoute>
          } />
          <Route path = "/login" element = {
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }/>
          <Route path = "/logout" element = {
            <PrivateRoute>
                <Logout />
            </PrivateRoute>
          }/>
          <Route path = "/register" element = {
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
          }/>
          <Route path = "/user/" element = {
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }>
              <Route path = "profile" element = {
                  <Profile />
              } />
              <Route path = "my-properties" element = {
                  <MyProperties />
               } />
              <Route path = "post-properties/" element = {
                    <PpContextProvider>
                        <PostProperties />
                   </PpContextProvider>
              }/>
              <Route path = "post-properties/post-land" element = {<PostLand />} />
              <Route path = "post-properties/post-house" element = {<PostLand />} />
              <Route path = "change-password" element = {<ChangePassword />} />
          </Route>
          <Route path = "/password-reset" element = {<PasswordReset />} />
          <Route path = "/password-reset/confirm/:uid/:token" element = {<PasswordResetConfirm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


