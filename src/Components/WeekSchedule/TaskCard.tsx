// src/components/TaskCardGrid.tsx
import "../../styles/Components/_weekschedule.scss";
import { useState } from "react";
import { useInputContext } from "../../Context/InputSubmissonContext";
import { FaArrowUp } from "react-icons/fa";

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
  const [inputs, setInputs] = useState<{ [day: string]: string }>({});

  const handleInputChange = (day: string, value: string) => {
    setInputs(prev => ({ ...prev, [day]: value }));
  };

  const handleSubmit = (e: React.FormEvent, day: string) => {
    e.preventDefault();
    const task = inputs[day]?.trim();
    if (task) {
      addSubmisson(day, task);
      setInputs(prev => ({ ...prev, [day]: '' }));
    }
  };

  return (
    <div className="TaskCard-grid">
      {days.map((day) => (
        <div className="TaskCard" key={day}>
          <h3>{day}</h3>
          <ul className="TaskList">
            {(submittedValue[day] || []).map((task, index) => (
              <li key={index} className={task.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(day, index)}
                />
                {task.text}
              </li>
            ))}
          </ul>
          <div className="Task-Input">
            <form onSubmit={(e) => handleSubmit(e, day)}>
              <input
                type="text"
                placeholder="Enter task title"
                value={inputs[day] || ""}
                onChange={(e) => handleInputChange(day, e.target.value)}
              />
              <button type="submit">
                <FaArrowUp />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskCardGrid;
