import PersonalTaskTools from "../Personal/PersonalTaskTools"
import { FaArrowUp } from "react-icons/fa";
import { useWorkContext } from "../../Context/WorkInputSubmissionContext";
import SubWorkTask from "./SubWorkTask";
import { useState } from "react";

function WorkTask() {
  const {
    WorkTasks,
    addWorkSubmission,
    toggleWorkCompleted,
    WorkSelectTask,
    WorkSelectedTask,
  } = useWorkContext();

  const [input, setinput] = useState("");

  const todayWork = new Date().toLocaleDateString("en-us", {
    weekday: "long",
  });
  const todayWorkTask = WorkTasks[todayWork] || [];

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      addWorkSubmission(todayWork, input.trim());
      setinput("");
    }
  };

  return (
    <div className="WorkTaskContainer">
      <PersonalTaskTools />
      <div className="WorkFlex">
        <div className="Work-Container1">
          <div className="WorkBox">
            {todayWorkTask.map((task, index) => (
              <div className="" key={index}>
                <div className="TaskBox-flex" onClick={() => WorkSelectTask(task)}>
                  <div className="Work-main"> 
                    <input
                      type="radio"
                      checked={task.complete}
                      onChange={() => toggleWorkCompleted(todayWork, index)}
                    />
                    <li className={task.complete ? "completed" : ""}>
                      {task.Work}
                    </li>
                  </div>
                  {task.worksubtasks && task.worksubtasks.length > 0 && (
                  <ul className="Subtask-List-inline">
                    {task.worksubtasks.map((sub, subIndex) => (
                      <li key={subIndex} className="subtask-inline">
                        • {sub}
                      </li>
                    ))}
                  </ul>
                )}
                </div>
              </div>
            ))}
          </div>
          <div className="WorkInput">
            <form onSubmit={HandleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setinput(e.target.value)}
                placeholder="Add a work task"
              />
              <button type="submit">
                <FaArrowUp />
              </button>
            </form>
          </div>
        </div>

        {WorkSelectedTask && <SubWorkTask />}
      </div>
    </div>
  );
}

export default WorkTask;
