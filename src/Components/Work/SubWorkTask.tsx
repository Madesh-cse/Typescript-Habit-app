import '../../styles/Components/WorkList.scss'
import ReminderModal from '../Modal/DateModel';
import { useState } from 'react';
import { IoLockClosedOutline } from 'react-icons/io5';
import { TbCircleDashedCheck } from "react-icons/tb";
import { FaArchive } from "react-icons/fa";
import { PiClockClockwiseBold } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { FaHashtag } from "react-icons/fa";
import { useWorkContext } from '../../Context/WorkInputSubmissionContext';
import { FaArrowUp } from "react-icons/fa";
import Attachement from '../Personal/Attachement';

function SubWorkTask() {
  const { WorkSelectedTask, WorkTasks, WorkSubTask,subtaskCompletion,WorkToggleSubTask } = useWorkContext();

  if (!WorkSelectedTask) {
    return null;
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [WorkSubInput, setWorkSubInput] = useState('');

  //Giving me a day in object eg {monday,tueday....}
  const selectedDay = Object.keys(WorkTasks).find(day =>
    // Finding which day the task list contain the select task
    // with the particular day any task id is match with selected is
    WorkTasks[day].some(work => work.id === WorkSelectedTask.id)
  );

  // on the particular day the selected task object index will be spoted
  const taskindex = selectedDay ? WorkTasks[selectedDay].findIndex(task => task.id === WorkSelectedTask.id) : -1;

   // Creating a fresh task from the selected task
  const currentTask =
    selectedDay && taskindex !== -1
      ? WorkTasks[selectedDay][taskindex]
      : null;

  const HandleSubtask = () => {
    if (WorkSubInput.trim() && selectedDay !== undefined && taskindex !== -1) {
      WorkSubTask(selectedDay, taskindex, WorkSubInput);
      setWorkSubInput('');
    }
  };

  // subtask completed progress level
   const taskId = currentTask?.id || '';
    // {["task-123"]: true.....}
    const subtaskStatus = Array.isArray(subtaskCompletion[taskId])? subtaskCompletion[taskId]: [];
   const total = currentTask?.worksubtasks?.length || 0;
   const completed = subtaskStatus.filter(Boolean).length;
   const progress = total ? Math.round((completed / total) * 100) : 0;

   console.log("Current task ID:", taskId);
   console.log("Subtask statuses:", subtaskStatus);   

  return (
    <div className="Subtask">
      <div className={`SubTaskBox ${currentTask?.complete ? 'subtask-blur' : ''}`}>
        <div className='SubTask_header'>
          <div className='SubTask-title'>
            <p><span><IoLockClosedOutline /></span> My list - Personal</p>
          </div>
          <div className='Subtask-extenstion'>
            {currentTask?.complete ?  <p> completed</p>: <p>Mark as completed</p> }
            <p><TbCircleDashedCheck /></p>
            <p><FaArchive /></p>
          </div>
        </div>

        <div className='Task-Heading'>
          <h1>{WorkSelectedTask.Work}</h1>
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
            <p><span className='note'><CgNotes /></span> Work</p>
          </div>
          <div className='Task-Tags'>
            <p><span className='tag'><FaHashtag /></span> Tags</p>
          </div>
        </div>

        <div className='Notes'>
          <h3>NOTES</h3>
          <textarea placeholder='Insert Your Notes here'></textarea>
        </div>

        <div className="progress-container">
          <label>Progress</label>
          <progress max={100} value={progress}></progress>
          <span>{progress}%</span>
        </div>


        <div className='Subtask-input'>
          <input type="text" value={WorkSubInput} onChange={(e) => setWorkSubInput(e.target.value)} placeholder=' Add a new subtask' />
          <button type='submit' onClick={HandleSubtask}><FaArrowUp /></button>
          <ul className='Subtask-List'>
            {currentTask?.worksubtasks?.map((sub, idx) => (
              <div className='List-item'> 
                <input
                  type="checkbox"
                  checked={subtaskStatus[idx] || false}
                  onChange={() => selectedDay && WorkToggleSubTask(selectedDay, taskindex, idx)}
                />
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

export default SubWorkTask;
