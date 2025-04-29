import { createContext, useContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

interface Task{
  id:string,
  text:string,
  completed:boolean,
  subtasks?: string[]
  duedate: Date;
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
    ToggleSubTask : (day:string,taskIndex:number,subIndex:number)=>void


    // Remove Functionality 
    RemoveTaskList : (day:string,index:number)=>void;

    // {["task-123"]: true.....}
    taskCompletion: { [taskId: string]: boolean[] };
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
    // add a state for selecting the subtask 

    const [subtaskCompletion,setsubtaskCompletion] = useState< {[taskId:string]:boolean[]}>({})

    //Personal Task
    // The submitted value is append to an array 
    const addSubmisson = (day: string,text:string)=>{
        const newTask: Task = { id:uuidv4(), text, completed: false,duedate:new Date() };
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

    // Remove Feature 

    const RemoveTaskList = (day:string,index:number)=>{
      setSubmittedValue(prev=>{
        // copy the original task array because we dont want to directly mutated the state
        const updatedTask = [...(prev[day] || [])]

        const removedTask = updatedTask[index];
        if(SelectedTask && removedTask.id === SelectedTask.id){
          setSelectedTask(null)
        }
        // splice(index value,remove element)
        updatedTask.splice(index,1)
        // return new updated state after removing the selected task
        const update = {
          ...prev,
          [day]:updatedTask
        }

        const updateTaskCompletion = {...subtaskCompletion}
        delete updateTaskCompletion[removedTask.id]
        setsubtaskCompletion(updateTaskCompletion)

        return update
      })
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

        const PersonaltaskId = updatedTask.id;
        const SubTaskcurrentStatus = subtaskCompletion[PersonaltaskId] || [];
        const updatedCompletion = [...SubTaskcurrentStatus, false];

        setsubtaskCompletion((prev) => ({
          ...prev,
          [PersonaltaskId]: updatedCompletion,
        }));
        
        return updatedValue;
      });
    };

    const ToggleSubTask = (day:string,taskIndex:number,subIndex:number)=>{
      const taskId = submittedValue[day][taskIndex].id

      setsubtaskCompletion((prev)=>{
        const currentTask = Array.isArray(prev[taskId]) ? prev[taskId] : [];

        const safeCurrent = [...currentTask];
        while (safeCurrent.length <= subIndex) {
          safeCurrent.push(false);
        }

        const updated = safeCurrent.map((status, i) =>
          i === subIndex ? !status : status
        );
    
        return {
          ...prev,
          [taskId]: updated,
        };
      })
    }
    
    return(
        <InputContext.Provider 
          value=
            {{submittedValue
            ,addSubmisson
            ,toggleCompleted
            , SelectedTask
            ,selectTask,
            SubTask,
            RemoveTaskList,
            ToggleSubTask,
            taskCompletion: subtaskCompletion 
          }}
          >
          {children}
        </InputContext.Provider>
    )
}