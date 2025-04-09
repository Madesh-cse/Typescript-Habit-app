import "../../styles/Components/_personallist.scss";
import { useInputContext } from "../../Context/InputSubmissonContext";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import PersonalTaskTools from "./PersonalTaskTools";
import SubTask from "./SubTask";

function PersonalTask() {
  const { submittedValue, addSubmisson, toggleCompleted } = useInputContext();
  const [input, setInput] = useState('');
  const [latestTask, setLatestTask] = useState<{ text: string; completed: boolean } | null>(null);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayTasks = submittedValue[today] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addSubmisson(today, input.trim());
      const newTask = { text: input.trim(), completed: false };
      setLatestTask(newTask); // store the newly added task
      setInput('');
    }
  };

  return (
    <div className="TaskContainer">
      <PersonalTaskTools />
      <div className="TaskFlex">
        <div className="Task-container-1">
          <div className="TaskBox">
            {todayTasks.map((task, index) => (
              <div className="TaskBox-flex" key={index}>
                <input
                  type="radio"
                  checked={task.completed}
                  onChange={() => toggleCompleted(today, index)}
                />
                <li className={task.completed ? 'completed' : ''}>{task.text}</li>
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
              <button type="submit"><FaArrowUp /></button>
            </form>
          </div>
        </div>

        {/* 🧠 Show SubTask only if a task was just added */}
        {latestTask && <SubTask task={latestTask} />}
      </div>
    </div>
  );
}

export default PersonalTask;
