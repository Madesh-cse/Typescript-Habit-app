import { createContext, useContext,useState } from "react"

interface WorkTask {
    Work : string,
    complete:boolean
}

interface WorkSubmission {
    //work Context

    WorkTasks : {[day:string]:WorkTask[]}
    addWorkSubmission : (day:string,value:string)=>void
    toggleWorkCompleted:(day:string,index:number)=>void

    WorkSelectedTask : WorkTask | null
    WorkSelectTask : (worktask:WorkTask) => void
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

        const newTaskWork:WorkTask = {Work,complete:false}
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
            i === index ? {...task,completed:!task.complete}:task
          )
        }))
    }

    const WorkSelectTask = (task:WorkTask) =>{
       setWorkSelectedTask(task)
       }

      return(
        <WorkContext.Provider value={{
            WorkTasks,
            addWorkSubmission,
            toggleWorkCompleted,
            WorkSelectedTask,
            WorkSelectTask


        }}>
            {children}
        </WorkContext.Provider>
      )
}