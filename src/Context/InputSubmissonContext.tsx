import { createContext, useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

interface Task{
  id:string,
  text:string,
  completed:boolean,
  subtasks?: string[]
}


// interface create a structure of an object
interface InputSubmissonType {
  //[monday]:text of task
    submittedValue:{ [day: string]: Task[] },
    addSubmisson:(day: string,value:string)=>void
    toggleCompleted: (day: string,index: number) => void;

    // SelectedTask : interface Task
    SelectedTask : Task | null;
    // method
    selectTask : (task:Task)=>void;
    SubTask : (day:string,taskIndex:number,subtask:string)=>void;
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
    // update a state with a interface Task structure
    const [ SelectedTask, setSelectedTask] = useState<Task | null>(null);

    //Personal Task
    // The submitted value is append to an array 
    const addSubmisson = (day: string,text:string)=>{
        const newTask: Task = { id:uuidv4(), text, completed: false };
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

    const selectTask = (task:Task) =>{
     setSelectedTask(task)
    }

    const SubTask = (day: string, taskIndex: number, subtask: string) => {
      // prev holds the task object 
      setSubmittedValue(prev => {
        // prev[day] => cuurent day task list is be map
        const updatedTasks = prev[day].map((task, i) =>
          // If the task is === selected task
          i === taskIndex
            ? { ...task, subtasks: [...(task.subtasks || []), subtask] }
            : task
        );
    
        const updatedValue = {
          ...prev,
          [day]: updatedTasks,
        };
    
        const updatedTask = updatedTasks[taskIndex];
        if (SelectedTask && prev[day][taskIndex].id === SelectedTask.id) {
          setSelectedTask(updatedTask);
        }
    
        return updatedValue;
      });
    };
    

    return(
        <InputContext.Provider 
          value=
            {{submittedValue
            ,addSubmisson
            ,toggleCompleted
            , SelectedTask
            ,selectTask,
            SubTask
          }}
          >
          {children}
        </InputContext.Provider>
    )
}