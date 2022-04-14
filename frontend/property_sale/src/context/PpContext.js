import React,{useReducer} from "react";
import { PpReducer,defaultFormState } from "../reducers/PpReducer";

export const PpContext = React.createContext();

export const PpContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(PpReducer,defaultFormState)
    

    return(
        <PpContext.Provider
            value = {{
                formState : state,
                formDispatch : dispatch
            }}
        >
            {children}
        </PpContext.Provider>
    )
} 


