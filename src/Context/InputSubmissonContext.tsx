import { createContext, useContext, useState } from "react"

interface InputSubmissonType {
    submittedValue:string[],
    addSubmisson:(value:string)=>void
}

// default context value has to created 

const InputContext = createContext<InputSubmissonType | undefined>(undefined)

// custome hook
export const useInputContext = ()=>{

    const context = useContext(InputContext)
    if(!context){
        throw new Error('useInputContext must be within the useInputProvider')
    }
    return context
}

// create a children for provider 

export const SubmissionProvider:React.FC<{children:React.ReactNode}>= ({children})=>{
    const [submittedValue,setSubmittedValue] = useState<string[]>([])

    // The submitted value is append to an array 
    const addSubmisson = (value:string)=>{
        setSubmittedValue((prevValue)=>[...prevValue,value])
    }
    return(
        <InputContext.Provider value={{submittedValue,addSubmisson}}>
            {children}
        </InputContext.Provider>
    )
}