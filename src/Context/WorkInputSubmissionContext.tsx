import { createContext, useContext,useState } from "react"
import { v4 as uuidv4 } from 'uuid';
interface WorkTask {
    id:string,
    Work : string,
    complete:boolean,
    worksubtasks?:string[]
}

interface WorkSubmission {
    //work Context

    WorkTasks : {[day:string]:WorkTask[]}
    addWorkSubmission : (day:string,value:string)=>void
    toggleWorkCompleted:(day:string,index:number)=>void

    WorkSelectedTask : WorkTask | null
    WorkSelectTask : (worktask:WorkTask) => void

    WorkSubTask : (day:string,taskIndex:number,subtask:string) => void
}

// default context value has to created 

const WorkContext = createContext<WorkSubmission | undefined>(undefined)

// custome Hook for Work Context 

export const useWorkContext = () =>{

    const context = useContext(WorkContext)

    if(!context){
        throw new Error('useWorkContext must be within the useInputProvider')
    }
    return context
}

// create a children for provider

export const WorkTaskProvider :React.FC<{children:React.ReactNode}> = ({children})=>{

    const[WorkTasks,setWorkTasks] = useState<{[day:string]:WorkTask[]}>({})

     // update a state with a interface Task structure
        const [ WorkSelectedTask, setWorkSelectedTask] = useState<WorkTask | null>(null);

    // Work Task

    const addWorkSubmission = (day:string,Work:string)=>{

        const newTaskWork:WorkTask = { id:uuidv4(),  Work,complete:false}
         // The prev task hold the task in an object
        setWorkTasks(prev=>({
          // [day:string , Task [text,complete]]
          ...prev,
          // [day]is a dynamic key(hold a days):[cuurent task or text of a day || if no task on a day it is empty[]],otherwise append new task
          [day]:[...(prev[day] || []),newTaskWork]
        }))
    }

    // Toggle the completed status
    // index is represent the clicked list item
    const toggleWorkCompleted = (day:string,index:number)=>{
        setWorkTasks(prev=>({
             // The prev task hold the task in an object
          ...prev,
          [day]:prev[day].map((task,i)=>
            i === index ? {...task,completed:!task.complete}:task // unchanged task
          )
        }))
    }

    const WorkSelectTask = (task:WorkTask) =>{
       setWorkSelectedTask(task)
    }

    const WorkSubTask = (day:string,taskIndex:number,subtask:string)=>{
        setWorkTasks(prev =>{
            const updatedTasks = prev[day].map((work,i)=>
                i === taskIndex ? { ...work, worksubtasks: [...(work.worksubtasks || []), subtask] } : work
            )

            const updatedValue = {
                ...prev,
                [day]: updatedTasks,
            };

            const updatedTask = updatedTasks[taskIndex];
            if (WorkSelectedTask && prev[day][taskIndex].id === WorkSelectedTask.id) {
              setWorkSelectedTask(updatedTask);
            }
        
            return updatedValue;
        })
    }


      return(
        <WorkContext.Provider value={{
            WorkTasks,
            addWorkSubmission,
            toggleWorkCompleted,
            WorkSelectedTask,
            WorkSelectTask,
            WorkSubTask
        }}>
            {children}
        </WorkContext.Provider>
      )
}