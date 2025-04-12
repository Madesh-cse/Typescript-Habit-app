import { createContext, useContext, useState } from "react"

interface Task{
  text:string,
  completed:boolean
}


// interface create a structure of an object
interface InputSubmissonType {
  //[monday]:text of task
    submittedValue:{ [day: string]: Task[] },
    addSubmisson:(day: string,value:string)=>void
    toggleCompleted: (day: string,index: number) => void;
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
    const [submittedValue,setSubmittedValue] = useState<{ [day: string]: Task[] }>({});

    // The submitted value is append to an array 
    const addSubmisson = (day: string,text:string)=>{
        const newTask: Task = { text, completed: false };
        setSubmittedValue(prev => ({
          // The prev task hold the task in an object
          ...prev,
          // [day]is a dynamic key(hold a days):[cuurent task or text of a day || if no task on a day it is empty[]],otherwise append new task
          [day]: [...(prev[day] || []), newTask],
        }));
    }

    // Toggle the completed status
    // index is represent the clicked list item
    const toggleCompleted = (day: string, index: number) => {
      setSubmittedValue(prev => ({
        ...prev,
        [day]: prev[day].map((task, i) =>
          i === index ? { ...task, completed: !task.completed } : task // return unchanged task
        ),
      }));
    };

    return(
        <InputContext.Provider value={{submittedValue,addSubmisson,toggleCompleted}}>
            {children}
        </InputContext.Provider>
    )
}