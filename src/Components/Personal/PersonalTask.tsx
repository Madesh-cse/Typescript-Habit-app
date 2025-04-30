import "../../styles/Components/_personallist.scss";
import { useInputContext } from "../../Context/InputSubmissonContext";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa"; 
import PersonalTaskTools from "./PersonalTaskTools";
import SubTask from "./SubTask";

function PersonalTask() {
  const { submittedValue,addSubmisson,toggleCompleted,selectTask,SelectedTask,RemoveTaskList} = useInputContext();
  const [input, setInput] = useState("");

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayTasks = submittedValue[today] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addSubmisson(today, input.trim());
      setInput("");
    }
  };

  return (
    <div className="TaskContainer">
      <PersonalTaskTools />
      <div className="TaskFlex">
        <div className="Task-container-1">
          <div className="TaskBox">
            {todayTasks.map((task, index) => (
              <div
                className="TaskBox-flex"
                key={task.id}
                onClick={() => selectTask(task)}
              >
                {/* Task name */}
                <div className="Task-main">
                  <div className="sub-flex">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompleted(today, index)}
                    />
                    <li className={task.completed ? "completed" : ""}>
                      {task.text}
                    </li>
                  </div>
                  {task.completed && (
                    <button type="submit" onClick={()=> RemoveTaskList(today, index)}> X</button>
                  )}
                </div>
                {/* Subtasks */}
                {task.subtasks && task.subtasks.length > 0 && (
                  <ul className="Subtask-List-inline">
                    {task.subtasks.map((sub, subIndex) => (
                      <li key={subIndex} className="subtask-inline">
                        • {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="TaskInput">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add Task"
              />
              <button type="submit">
                <FaArrowUp />
              </button>
            </form>
          </div>
        </div>
        {/* Show SubTask modal if a task is selected */}
      {SelectedTask && <SubTask  />}
      </div>
    </div>
  );
}

export default PersonalTask;
