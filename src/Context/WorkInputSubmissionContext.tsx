    import { createContext, useContext,useState } from "react"
    import { v4 as uuidv4 } from 'uuid';
    interface WorkTask {
        id:string,
        text : string,
        completed:boolean,
        worksubtasks?:string[]
        duedate:string;
        taskType:'Work'
    }
    interface WorkSubmission {
        //work Context

        WorkTasks : {[day:string]:WorkTask[]}
        addWorkSubmission : (day:string,value:string)=>void
        toggleWorkCompleted:(day:string,index:number)=>void

        WorkSelectedTask : WorkTask | null
        WorkSelectTask : (worktask:WorkTask) => void

        WorkSubTask : (day:string,taskIndex:number,subtask:string) => void
        WorkToggleSubTask: (day: string, taskIndex: number, subIndex: number) => void;

        // Remove TaskList

        WorkRemoveTaskList : (day:string,index:number)=>void
        // {["task-123"]: true.....}
        subtaskCompletion: { [taskId: string]: boolean[] };
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

        const [subtaskCompletion, setSubtaskCompletion] = useState< {  [taskId: string]: boolean[]}>({});


        // Work Task
        const addWorkSubmission = (day:string,text:string)=>{

            const newTaskWork:WorkTask = { id:uuidv4(),  text,completed:false,duedate:new Date().toISOString(),taskType:'Work'}
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
                i === index ? {...task,complete:!task.completed}:task // unchanged task
            )
            }))
        }

        const WorkSelectTask = (task:WorkTask) =>{
        setWorkSelectedTask(task)
        }


        const  WorkRemoveTaskList = (day:string,index:number)=>{
            setWorkTasks(prev=>{
                // we are copy the original task on the specifi day other wise it is an empty array
                const workupdatedTask = [...(prev[day] || [])]
                const removeWork = workupdatedTask[index]

                if(WorkSelectedTask && removeWork.id === WorkSelectedTask.id){
                    setWorkSelectedTask(null)
                }
                // splice(index value,remove count)
                workupdatedTask.splice(index,1)

                // return the updated task object after removing the selected task
                const updated = {
                    ...prev,
                    [day]:workupdatedTask
                }

                const updatedCompletion = {...subtaskCompletion};
                delete updatedCompletion[removeWork.id]
                setSubtaskCompletion(updatedCompletion)


                return updated
            })
        }
        const WorkSubTask = (day: string, taskIndex: number, subtask: string) => {
            setWorkTasks((prev) => {
              const updatedTasks = prev[day].map((task, i) =>
                i === taskIndex
                  ? { ...task, worksubtasks: [...(task.worksubtasks || []), subtask] }
                  : task
              );
          
              const updatedValue = {
                ...prev,
                [day]: updatedTasks,
              };
          
              const updatedTask = updatedTasks[taskIndex];
              if (WorkSelectedTask && prev[day][taskIndex].id === WorkSelectedTask.id) {
                setWorkSelectedTask(updatedTask);
              }
          
              const taskId = updatedTask.id;
              const currentStatus = subtaskCompletion[taskId] || [];
              const updatedCompletion = [...currentStatus, false];
              setSubtaskCompletion((prev) => ({
                ...prev,
                [taskId]: updatedCompletion,
              }));
          
              return updatedValue;
            });
          };
          

          const WorkToggleSubTask = (day: string, taskIndex: number, subIndex: number) => {
            // we getting a id of selected task on the specifi day
            const taskId = WorkTasks[day][taskIndex].id;
          
            setSubtaskCompletion((prev) => {
              const current = Array.isArray(prev[taskId]) ? prev[taskId] : [];
          
              // Ensure array has enough length (fix edge cases)
              const safeCurrent = [...current];
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
            });
          };
        return(
            <WorkContext.Provider value={{
                WorkTasks,
                addWorkSubmission,
                toggleWorkCompleted,
                WorkSelectedTask,
                WorkSelectTask,
                WorkSubTask,
                WorkRemoveTaskList,
                WorkToggleSubTask,
                subtaskCompletion
            }}>
                {children}
            </WorkContext.Provider>
        )
    }