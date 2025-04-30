import PersonalTaskTools from "../Personal/PersonalTaskTools";
import { FaArrowUp } from "react-icons/fa";
import { useInputContext } from "../../Context/InputSubmissonContext";
import { useWorkContext } from "../../Context/WorkInputSubmissionContext";
import SubTask from "../Personal/SubTask";
import SubWorkTask from "../Work/SubWorkTask";

function AllTask() {
  const {submittedValue,selectTask,SelectedTask,addSubmisson,} = useInputContext();
  const { WorkTasks,WorkSelectTask,WorkSelectedTask,} = useWorkContext();

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const NormalizeDate = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const todayNormalized = NormalizeDate(today);
  const tomorrowNormalized = NormalizeDate(tomorrow);

  const categorizeTask = (taskDate: Date) => {
    const normalizedTask = NormalizeDate(taskDate);
    if (normalizedTask.getTime() === todayNormalized.getTime()) return "today";
    if (normalizedTask.getTime() === tomorrowNormalized.getTime()) return "tomorrow";
    if (normalizedTask.getTime() > todayNormalized.getTime()) return "upcoming";
    return "someday";
  };

  const allPersonalTasks = Object.values(submittedValue).flat();
  const allWorkTasks = Object.values(WorkTasks).flat();
  const allTasks = [...allPersonalTasks, ...allWorkTasks];

  const todayTask = allTasks.filter(task => categorizeTask(new Date(task.duedate)) === "today");
  const tomorrowTask = allTasks.filter(task => categorizeTask(new Date(task.duedate)) === "tomorrow");
  const upcomingTask = allTasks.filter(task => categorizeTask(new Date(task.duedate)) === "upcoming");
  const somedayTask = allTasks.filter(task => categorizeTask(new Date(task.duedate)) === "someday");


  const todayTasks = allTasks.filter((task) =>
    categorizeTask(new Date(task.duedate || task.duedate)) === "today"
  );

  const handleTaskSelect = (task: any) => {
    if (task.taskType === "personal") {
      selectTask(task);
    } else if (task.taskType === "Work") {
      WorkSelectTask(task);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).elements.namedItem("taskInput") as HTMLInputElement;
    const value = input.value.trim();
    if (!value) return;

    const todayStr = todayNormalized.toISOString();

    // Add based on your app’s current task mode
    addSubmisson(todayStr, value); // for personal
    // or addWorkSubmission(todayStr, value); // for work

    input.value = "";
  };

  return (
    <div className="AllTask">
      <PersonalTaskTools />
      <div className="AllTaskFlex">
        <div className="AllTaskContainer-1">
          <div className="AllTaskBox">
            <section className="task-section">
                
              <h2>Today</h2>
              <ul>
                {todayTasks.map((task) => (
                  <div className="Select-Task" key={task.id} onClick={() => handleTaskSelect(task)}>
                    <div className="task-subflex">
                      <input type="checkbox" checked={task.completed || task.completed} readOnly />
                      {/* personal || work */}
                      <li>{task.text || task.text}</li>
                    </div>
                  </div>
                ))}
              </ul>
            </section>
          </div>

          <div className="AllTaskInput">
            <form onSubmit={handleSubmit}>
              <input type="text" name="taskInput" />
              <button type="submit">
                <FaArrowUp />
              </button>
            </form>
          </div>
        </div>

        {/* Conditional SubTask or WorkSubTask */}
        <div className="AllTaskContainer-2">
          {SelectedTask?.taskType === "personal" && <SubTask />}
          {WorkSelectedTask?.taskType === "Work" && <SubWorkTask  />}
        </div>
      </div>
    </div>
  );
}

export default AllTask;
