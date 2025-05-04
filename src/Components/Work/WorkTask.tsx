import PersonalTaskTools from "../Personal/PersonalTaskTools"
import { FaArrowUp } from "react-icons/fa";
import { useWorkContext } from "../../Context/WorkInputSubmissionContext";
import SubWorkTask from "./SubWorkTask";
import { useState } from "react";
import { db,auth } from "../../Firebase";
import { setDoc,doc } from "firebase/firestore";

function WorkTask() {
  const { WorkTasks,addWorkSubmission,toggleWorkCompleted,WorkSelectTask,WorkSelectedTask,WorkRemoveTaskList } = useWorkContext();

  const [input, setinput] = useState("");

  const todayWork = new Date().toLocaleDateString("en-us", {
    weekday: "long",
  });
  const todayWorkTask = WorkTasks[todayWork] || [];

  const HandleSubmit = async (e: React.FormEvent) => {
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
        taskType: "Work",
      }

      try{
        await setDoc(doc(db,"users",user.uid,"work",taskId),taskDate)
        console.log("Task saved to Firestore");

        addWorkSubmission(todayWork, input.trim(),todayDateStr );
        setinput("");
      }catch(error:any){
        console.error("Error saving task to Firestore:", error);
      }

      addWorkSubmission(todayWork, input.trim(),todayDateStr);
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
                    <div className="sub-flex"> 
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleWorkCompleted(todayWork, index)}
                      />
                      <li className={task.completed ? "completed" : ""}>
                        {task.text}
                      </li>
                    </div>
                    {task.completed && (
                      <button type="submit" onClick={()=>WorkRemoveTaskList(todayWork,index)}> X</button>
                    )}
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
