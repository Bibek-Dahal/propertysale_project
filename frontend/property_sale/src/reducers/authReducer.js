import jwt_decode from 'jwt-decode';

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
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return initial_auth_condition

        case "updateAccessToken":
            return {
                ...state,
                access_token:action.token
            }    

      default:
          throw(`unknown action type ${action.type}`)
  }
}
