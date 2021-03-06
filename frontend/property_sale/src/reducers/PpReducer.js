export const defaultFormState = {
    
}

export const PpReducer = (state,action) => {
    switch(action.type){
        case "set":
            console.log('setting data in ocntest');
            const data = action.data
            // console.log('state',state)
            // console.log('data',data)
            // console.log('action',action)
            const newt = {...state,...data}
            console.log(newt)
            return {
                ...state,
                ...data
            };

            case "reset":
                console.log('resetting data in ocntest');
                return {
                    ...defaultFormState
                };
        default:
            throw(`unknown action type ${action.type}`)
    }
}