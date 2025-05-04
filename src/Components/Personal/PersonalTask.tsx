import "../../styles/Components/_personallist.scss";
import { useInputContext } from "../../Context/InputSubmissonContext";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa"; 
import PersonalTaskTools from "./PersonalTaskTools";
import SubTask from "./SubTask";
import { db,auth } from "../../Firebase";
import { setDoc,doc } from "firebase/firestore";

function PersonalTask() {
  const { submittedValue,addSubmisson,toggleCompleted,selectTask,SelectedTask,RemoveTaskList} = useInputContext();
  const [input, setInput] = useState("");

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDate = new Date();
  const today = days[todayDate.getDay()];
  const todayTasks = submittedValue[today] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const user = auth.currentUser;
      if(!user) return

      const todayDateStr = new Date().toISOString();
      const taskId = `${Date.now()}`;

      const taskDate = {
        id: taskId,
        text: input.trim(),
        completed: false,
        createdAt: todayDateStr,
        taskType: "personal",
      }

      try{
        await setDoc(doc(db,"users",user.uid,"tasks",taskId),taskDate)
        console.log("Task saved to Firestore");

        addSubmisson(today, input.trim(),todayDateStr );
        setInput("");
      }catch(error:any){
        console.error("Error saving task to Firestore:", error);
      }
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
