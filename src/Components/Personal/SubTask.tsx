import '../../styles/Components/_subtask.scss';
import ReminderModal from '../Modal/DateModel';
import { useState } from 'react';
import { IoLockClosedOutline } from 'react-icons/io5';
import { TbCircleDashedCheck } from "react-icons/tb";
import { FaArchive } from "react-icons/fa";
import { PiClockClockwiseBold } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { FaHashtag } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useInputContext } from '../../Context/InputSubmissonContext';
import Attachement from './Attachement';

interface SubtaskProps {}


function SubTask({}:SubtaskProps) {

  const { SelectedTask,submittedValue,SubTask } = useInputContext();

  if(!SelectedTask){
    return null
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [subtaskInput, setSubtaskInput] = useState("");


  console.log("SelectedTask subtasks: ", SelectedTask);

  //Giving me a day in object eg {monday,tueday....}
  const selectedday = Object.keys(submittedValue).find(day=>
    // Finding which day the task list contain the select task
    // with the particular day any task id is match with selected is
    submittedValue[day].some(task=>task.id===SelectedTask.id)
  )
  console.log(selectedday)
  // on the particular day the selected task object index will be spoted
  const taskIndex = selectedday ? submittedValue[selectedday].findIndex(task=>task.id === SelectedTask.id):-1
  console.log(taskIndex)
  
  // Creating a fresh task from the selected task
  const currentTask =
    selectedday && taskIndex !== -1
      ? submittedValue[selectedday][taskIndex]
    : null;
  console.log('currenttask',currentTask) 

  const HandleSubtask = ()=>{
    if(subtaskInput.trim() && selectedday!==undefined && taskIndex!==-1){
      SubTask(selectedday,taskIndex,subtaskInput);
      setSubtaskInput('')
    }
  }

  return (
    <div  className='Subtask'>
      <div className={`SubTaskBox ${currentTask?.completed ? 'subtask-blur' : ''}`}>
        <div className='SubTask_header'>
          <div className='SubTask-title'>
            <p><span><IoLockClosedOutline /></span> My list - Personal</p>
          </div>
          <div className='Subtask-extenstion'>
            {currentTask?.completed ?  <p className='Completed-task'> completed</p> : <p>Mark as complete</p> }
            <p><TbCircleDashedCheck /></p>
            <p><FaArchive /></p>
          </div>
        </div>
        {/* Show the latest added task title */}
        <div className='Task-Heading'>
          <h1>{currentTask?.text}</h1>
        </div>

        <div className='Remainder'>
          <div className='Remainder-clock'>
            <button onClick={() => setModalOpen(true)}>
              <span className='Clock'><PiClockClockwiseBold /></span> Open Reminder:
              {reminderDate && (
                <span>
                  {reminderDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </button>
            <ReminderModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onSave={(date) => setReminderDate(date)}
            />
          </div>
          <div className='Task-Type'>
            <p><span className='note'><CgNotes /></span> Personal</p>
          </div>
          <div className='Task-Tags'>
            <p><span className='tag'><FaHashtag /></span> Tags</p>
          </div>
        </div>
        {/* Enter the notes */}
        <div className='Notes'>
          <h3>Notes</h3>
          <textarea placeholder='Insert Your Notes here'></textarea>
        </div>
        <div className='Subtask-input'>
          <input type="text" value={subtaskInput} onChange={(e)=>setSubtaskInput(e.target.value)} placeholder=' Add a new subtask'/>
          <button type='submit' onClick={HandleSubtask}><FaArrowUp /></button>
          <ul className='Subtask-List'>
            {currentTask?.subtasks?.map((sub, idx) => (
              <div className='List-item'> 
                <label className="round-checkbox">
                  <input type="checkbox" />
                  <span className="custom-check"></span>
               </label>
                <li key={idx}>{sub}</li>
              </div>
            ))}
          </ul>
        </div>
        <Attachement/>
      </div>
    </div>
  );
}

export default SubTask;
