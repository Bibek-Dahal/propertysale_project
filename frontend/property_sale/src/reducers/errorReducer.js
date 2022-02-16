export const initial_state_error = {};


export const errorReducer = (state,action) => {
    switch(action.type){
        case "setError":
            console.log('inside errorReducer',action.error);
            return action.error

        case "default_error":
            return {}
        
        case "set_error_status":
            return {...state,status : action.status}
        
        default:
            return state;
    }
}