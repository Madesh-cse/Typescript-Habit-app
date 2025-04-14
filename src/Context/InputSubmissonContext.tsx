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

    //work Context

    WorkTasks : {[day:string]:Task[]}
    addWorkSubmission : (day:string,value:string)=>void
    toggleWorkCompleted:(day:string,index:number)=>void


    // SelectedTask : interface Task
    SelectedTask : Task | null;
    // method
    selectTask : (task:Task)=>void
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
    const[WorkTasks,setWorkTasks] = useState<{[day:string]:Task[]}>({})
    // update a state with a interface Task structure
    const [ SelectedTask, setSelectedTask] = useState<Task | null>(null);

    //Personal Task
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

    // Work Task

    const addWorkSubmission = (day:string,text:string)=>{

      const newTaskWork:Task = {text,completed:false}
       // The prev task hold the task in an object
      setWorkTasks(prev=>({
        // [day:string , Task [text,complete]]
        ...prev,
        [day]:[...(prev[day] || []),newTaskWork]
      }))
    }

    const toggleWorkCompleted = (day:string,index:number)=>{
      setWorkTasks(prev=>({
        ...prev,
        [day]:prev[day].map((task,i)=>
          i === index ? {...task,completed:!task.completed}:task
        )
      }))
    }

    const selectTask = (task:Task) =>{
     setSelectedTask(task)
    }

    return(
        <InputContext.Provider 
          value=
            {{submittedValue
            ,addSubmisson
            ,toggleCompleted
            , SelectedTask
            ,selectTask,
            WorkTasks,
            addWorkSubmission,
            toggleWorkCompleted
          }}
          >
          {children}
        </InputContext.Provider>
    )
}