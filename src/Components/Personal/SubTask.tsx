import '../../styles/Components/_subtask.scss';
import ReminderModal from '../Modal/DateModel';
import { useState } from 'react';
import { IoLockClosedOutline } from 'react-icons/io5';
import { TbCircleDashedCheck } from "react-icons/tb";
import { FaArchive } from "react-icons/fa";
import { PiClockClockwiseBold } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { FaHashtag } from "react-icons/fa";
import { useInputContext } from '../../Context/InputSubmissonContext';



function SubTask() {

  const { SelectedTask,submittedValue,SubTask } = useInputContext();

  if(!SelectedTask){
    return null
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [subtaskInput, setSubtaskInput] = useState("");

  console.log("SelectedTask subtasks: ", SelectedTask);

  //Finding which day the task is contained
  const selectedday = Object.keys(submittedValue).find(day=>
    //if any task in that array is exactly equal === to SelectedTask.
    submittedValue[day].some(task=>task===SelectedTask)
  )
  // if selectedday give me a selected day object with the index of dayarray 
  // example Thurday : {subtask:string} with an index
  const taskIndex = selectedday ? submittedValue[selectedday].findIndex(task=>task === SelectedTask):-1

  const HandleSubtask = ()=>{
    if(subtaskInput.trim() && selectedday!==undefined && taskIndex!==-1){
      SubTask(selectedday,taskIndex,subtaskInput);
      setSubtaskInput('')
    }
  }

  return (
    <div className="Subtask">
      <div className="SubTaskBox">
        <div className='SubTask_header'>
          <div className='SubTask-title'>
            <p><span><IoLockClosedOutline /></span> My list - Personal</p>
          </div>
          <div className='Subtask-extenstion'>
            <p>Mark as complete</p>
            <p><TbCircleDashedCheck /></p>
            <p><FaArchive /></p>
          </div>
        </div>
        {/* Show the latest added task title */}
        <div className='Task-Heading'>
          <h1>{SelectedTask.text}</h1>
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
          <input type="text" value={subtaskInput} onChange={(e)=>setSubtaskInput(e.target.value)} placeholder='Subtask'/>
          <button onClick={HandleSubtask}>Add Task</button>
          <ul className='Subtask-List'>
            {SelectedTask.subtasks?.map((sub, idx) => (
              <li key={idx}>{sub}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SubTask;
