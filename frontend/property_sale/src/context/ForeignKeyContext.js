import React,{useState} from "react";

export const ForeignKeyContext = React.createContext();

export const ForeignKeyContextProvider = ({children}) => {

    const [keys,setKeys] = useState({})

    
    return(
        <ForeignKeyContext.Provider
            value = {
                {keys,
                setKeys}
            }
        >
            {children}
        </ForeignKeyContext.Provider>
    )
} 


