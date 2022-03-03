import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Logout from '../components/Auth/Logout';

export const initial_auth_condition = {
    access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null,
    refresh_token: localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') : null,
    user: localStorage.getItem('access_token') ? jwt_decode(localStorage.getItem('access_token')) : null,
}

export const authReducer = (state,action) => {
  switch(action.type){
      case "logUser":
          console.log('inside log user',action.data)
          console.log('context data saved')
          localStorage.setItem("access_token",action.data.access_token);
          localStorage.setItem("refresh_token",action.data.refresh_token);
          return {
              ...state,
              access_token : action.data.access_token,
              refresh_token : action.data.refresh_token,
              user : jwt_decode(action.data.access_token)
          }

        case "logoutUser":
            console.log('logging out user')
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return {
                access_token : null,
                refresh_token : null,
                user : null
            }

        case "updateAccessToken":
            return {
                ...state,
                access_token:action.token
            }    
        
        case "logout":


            

            return {
                access_token : null,
                refresh_token : null,
                user : null
            }

      default:
          throw(`unknown action type ${action.type}`)
  }
}
