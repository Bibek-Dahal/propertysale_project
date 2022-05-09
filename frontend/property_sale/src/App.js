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
  PostHouse,
  House,
  Land,
  Search,
  ListingPage
} from './components/index'
import PgNotFound from './components/page_not_found/PgNotFound';
import PrivateRoute from './components/utils/PrivateRoute';
import Logout from './components/Auth/Logout';
import ProtectedRoute from './components/utils/ProtectedRoute';
import PublicRoute from './components/utils/PublicRoute';
import ScrollToTop from './components/utils/ScrollToTop';


function App() {
  const {PopupVisible} = usePopup();
  return (
    <div className="App">
      <Modal/>
      <Router >
        <ScrollToTop>
          <Routes>
            <Route path = "/" element = {
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="*" element={<PgNotFound />} />
            <Route path = "/my-properties/house/:id" element = {
                <PrivateRoute>
                  <House />
                </PrivateRoute>
            }/>
            <Route path = "/my-properties/land/:id" element = {
                <PrivateRoute>
                  <Land />
                </PrivateRoute>
            }/>
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
                <Route path = "my-properties" element = {<MyProperties />}/>
                <Route path = "post-properties/" element = {
                    <PostProperties />
                }/>
                <Route path = "post-properties/post-land" element = {<PostLand />} />
                <Route path = "post-properties/post-house" element = {<PostLand />} />
                <Route path = "change-password" element = {<ChangePassword />} />
            </Route>
            <Route path = "/password-reset" element = {<PasswordReset />} />
            <Route path = "/password-reset/confirm/:uid/:token" element = {<PasswordResetConfirm />} />
            <Route path = "/house/:id" element = {
              <PrivateRoute>
                  <House />
              </PrivateRoute>
            }/>
            <Route path = "/land/:id" element = {
                <PrivateRoute>
                  <Land />
                </PrivateRoute>
            } />
            <Route path = "/search/" element = {
                <Search />
            } />
            <Route path = "/search/:query" element = {
                <Search />
            } />
            <Route path = "/:listingType" element = {
              <ListingPage />
            } />
          </Routes>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;


