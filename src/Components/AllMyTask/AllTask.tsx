import PersonalTaskTools from "../Personal/PersonalTaskTools";
import { FaArrowUp } from "react-icons/fa";
import { useInputContext } from "../../Context/InputSubmissonContext";
import { useWorkContext } from "../../Context/WorkInputSubmissionContext";
import SubTask from "../Personal/SubTask";
import SubWorkTask from "../Work/SubWorkTask";

function AllTask() {
  const { submittedValue, selectTask, SelectedTask, addSubmisson,toggleCompleted } =
  useInputContext();

  const { WorkTasks, WorkSelectTask, WorkSelectedTask,toggleWorkCompleted } = useWorkContext();

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const normalizeDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const todayNormalized = normalizeDate(today);
  const tomorrowNormalized = normalizeDate(tomorrow);

  const categorizeTask = (taskDate: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const normalizedTaskDate = normalizeDate(taskDate);

    if (normalizedTaskDate.getTime() === todayNormalized.getTime())
      return "today";
    if (normalizedTaskDate.getTime() === tomorrowNormalized.getTime())
      return "tomorrow";
    if (normalizedTaskDate > todayNormalized) return "upcoming";
    return "someday";
  };

  const allPersonalTasks = Object.values(submittedValue).flat();
  const allWorkTasks = Object.values(WorkTasks).flat();
  const allTasks = [...allPersonalTasks, ...allWorkTasks];

  const taskSections = {
    Today: allTasks.filter(
      (task) => categorizeTask(new Date(task.duedate)) === "today"
    ),
    Tomorrow: allTasks.filter(
      (task) => categorizeTask(new Date(task.duedate)) === "tomorrow"
    ),
    Upcoming: allTasks.filter(
      (task) => categorizeTask(new Date(task.duedate)) === "upcoming"
    ),
    Someday: allTasks.filter(
      (task) => categorizeTask(new Date(task.duedate)) === "someday"
    ),
  };

  const handleTaskSelect = (task: any) => {
    if (task.taskType === "personal") {
      selectTask(task);
      WorkSelectTask(null)
    } else if (task.taskType === "Work") {
      WorkSelectTask(task);
      selectTask(null)
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem(
      "taskInput"
    ) as HTMLInputElement;
    const value = input.value.trim();
    if (!value) return;

    const todayStr = todayNormalized.toISOString();
    addSubmisson(todayStr, value, todayStr);
    input.value = "";
  };

  const handleToggleCompleted = (task: any) => {
    const dueDate = normalizeDate(new Date(task.duedate)).toISOString();
  
    if (task.taskType === "personal") {
      const index = submittedValue[dueDate]?.findIndex(t => t.id === task.id);
      if (index !== -1 && index !== undefined) {
        toggleCompleted(dueDate, index);
      }
    } else if (task.taskType === "Work") {
      const index = WorkTasks[dueDate]?.findIndex(t => t.id === task.id);
      if (index !== -1 && index !== undefined) {
        toggleWorkCompleted(dueDate, index);
      }
    }
  };
  

  return (
    <div className="AllTask">
      <PersonalTaskTools />
      <div className="AllTaskFlex">
        <div className="AllTaskContainer-1">
          <div className="AllTaskBox">
            {Object.entries(taskSections).map(([section, tasks]) => (
              <section className="task-section" key={section}>
                <h2>{section}</h2>
                {tasks.length > 0 ? (
                  <ul>
                    {tasks.map((task) => (
                      <div
                        className="Select-Task"
                        key={task.id}
                        onClick={() => handleTaskSelect(task)}
                      >
                        <div className="task-subflex">
                          <input
                            type="checkbox"
                            checked={task.completed === true} 
                            onChange={()=>handleToggleCompleted(task)}
                          />
                          <li>{task.text}</li>
                        </div>
                      </div>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </section>
            ))}
          </div>

          <div className="AllTaskInput">
            <form onSubmit={handleSubmit}>
              <input type="text" name="taskInput" placeholder="Add task..." />
              <button type="submit">
                <FaArrowUp />
              </button>
            </form>
          </div>
        </div>
        <div className="AllTaskContainer-2">
          <div className="fade-transition"> 
            {SelectedTask && SelectedTask.taskType === 'personal' && <SubTask/>}
            {WorkSelectedTask && WorkSelectedTask.taskType === 'Work' && <SubWorkTask/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTask;
