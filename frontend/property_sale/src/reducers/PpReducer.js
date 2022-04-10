export const defaultFormState = {
    title : "",
    description : ""
}

export const PpReducer = (state,action) => {
    switch(action.type){
        case "set":
            console.log('setting data in ocntest');
            const data = action.data
            // console.log('state',state)
            // console.log('data',data)
            // console.log('action',action)
            // const newt = {...state,...data}
            // console.log(newt)
            return {
                ...state,
                ...data
            };


        default:
            throw(`unknown action type ${action.type}`)
    }
}