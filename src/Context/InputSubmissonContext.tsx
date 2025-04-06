import { createContext, useContext, useState } from "react"

interface Task{
    text:string,
    completed:boolean
}

// interface create a structure of an object
interface InputSubmissonType {
    submittedValue:Task[],
    addSubmisson:(value:string)=>void
    toggleCompleted: (index: number) => void;
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
    const [submittedValue,setSubmittedValue] = useState<Task[]>([])

    // The submitted value is append to an array 
    const addSubmisson = (text:string)=>{
        const newTask: Task = { text, completed: false };
        setSubmittedValue((prev) => [...prev, newTask]);
    }

    // Toggle the completed status
    // index is represent the clicked list item
  const toggleCompleted = (index: number) => {
    setSubmittedValue((prev) =>
      prev.map((task, i) =>
        // : Is this task's index equal to the one that was clicked?
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

    return(
        <InputContext.Provider value={{submittedValue,addSubmisson,toggleCompleted}}>
            {children}
        </InputContext.Provider>
    )
}