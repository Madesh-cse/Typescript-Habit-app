import '../../styles/Components/_personallist.scss'
import ReminderModal from '../Modal/DateModel'
import { useState } from 'react';

function SubTask() {

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div className="Subtask">
      <div className="SubTaskBox">
        <div>
          <button onClick={() => setModalOpen(true)}>Open Reminder</button>
          <ReminderModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </div>
    </div>
  )
}

export default SubTask