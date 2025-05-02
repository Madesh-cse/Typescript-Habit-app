import "../../styles/Components/_weekschedule.scss";
import { useState } from "react";
import { useInputContext } from "../../Context/InputSubmissonContext";
import { useWorkContext } from "../../Context/WorkInputSubmissionContext";
import { FaArrowUp } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function TaskCardGrid() {
  const { submittedValue, addSubmisson, toggleCompleted } = useInputContext();
  const {WorkTasks,toggleWorkCompleted} = useWorkContext();

  const [inputs, setInputs] = useState<{ [day: string]: string }>({});

  const handleInputChange = (day: string, value: string) => {
    // It gets the value from the inputs states and update with the current input task
    // [sunday]:'hello everyone'
    setInputs(prev => ({ ...prev, [day]: value }));
  };

  const handleSubmit = (e: React.FormEvent, day: string) => {
    e.preventDefault();
   // Looks up the task for the specified day from the inputs state.
    const task = inputs[day]?.trim();
    if (task) {
      const today =  new Date()
      const todayIndex = today.getDay()
      const dayIndex = days.indexOf(day)
      const diffday = (dayIndex - todayIndex+7) % 7
      const duedate = new Date(today)
      duedate.setDate(today.getDate()+diffday)
      duedate.setHours(0,0,0,0)
      addSubmisson(day,task,duedate.toISOString());
      // spread the inputs value without changes
      setInputs(prev => ({ ...prev, [day]: '' }));
    }
  };

  return (
    <div className="TaskCard-grid">
      {days.map((day) => (
        <div className="TaskCard" key={day}>
          <h3>{day}</h3>
          <ul className="TaskList">
            {/* Personal Tasks */}
            {(submittedValue[day] || []).map((task, index) => (
              <div className="Schedule-flex" key={`personal-${index}`}>
                <li className={task.completed ? "completed" : ""}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(day, index)}
                  />
                </li>
                <div className="Personal-list">
                  <p className="Task-type">
                    <span><IoLockClosedOutline /></span> My list &gt; Personal
                  </p>
                  <p>{task.text}</p>
                  {task.subtasks && task.subtasks.length > 0 && (
                    <ul className="Subtask-List-inline">
                      {task.subtasks.map((sub, subIndex) => (
                        <li key={subIndex} className="subtask-inline">• {sub}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* Work Tasks */}
            {(WorkTasks[day] || []).map((task, index) => (
              <div className="Schedule-flex" key={`work-${index}`}>
                <li className={task.completed ? "completed" : ""}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleWorkCompleted(day, index)}
                  />
                </li>
                <div className="Personal-list">
                  <p className="Task-type">
                    <span><IoLockClosedOutline /></span> My list &gt; Work
                  </p>
                  <p>{task.text}</p>
                  {task.worksubtasks && task.worksubtasks.length > 0 && (
                    <ul className="Subtask-List-inline">
                      {task.worksubtasks.map((sub, subIndex) => (
                        <li key={subIndex} className="subtask-inline">• {sub}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </ul>

          {/* Inputs */}
          <div className="Task-Input">
            <form onSubmit={(e) => handleSubmit(e, day)}>
              <input
                type="text"
                placeholder="Enter personal task"
                value={inputs[day] || ""}
                onChange={(e) => handleInputChange(day, e.target.value)}
              />
              <button type="submit"><FaArrowUp /></button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskCardGrid;
