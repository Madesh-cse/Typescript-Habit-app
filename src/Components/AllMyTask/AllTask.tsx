import PersonalTaskTools from "../Personal/PersonalTaskTools";
import { FaArrowUp } from "react-icons/fa";
import { useInputContext } from "../../Context/InputSubmissonContext";
function AllTask() {
  const { submittedValue } = useInputContext();

  const today = new Date();
//   console.log(today)
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
//   console.log(tomorrow)

  // remove the minutes and second to normalize the day

  const NormalizeDate = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    // console.log('mad',normalized);
    return normalized;
  };

  const todayNormalized = NormalizeDate(today);
  const tomorrowNormalized = NormalizeDate(tomorrow);

  const CatogorizedTask = (taskDate: Date) => {
    const NormalizedTask = NormalizeDate(taskDate);
    // console.log('task',NormalizedTask)

    if (NormalizedTask.getTime() === todayNormalized.getTime()) {
      return "today";
    } else if (NormalizedTask.getTime() === tomorrowNormalized.getTime()) {
      return "tomorrow";
    } else if (NormalizedTask.getTime() > todayNormalized.getTime()) {
      return "upcoming";
    } else {
      return "someday";
    }
  };

  const AllTask = Object.values(submittedValue).flat();

  const todayTask = AllTask.filter(
    (task) => CatogorizedTask(new Date(task.duedate)) === "today"
  );
  const tomorrowTask = AllTask.filter(
    (task) => CatogorizedTask(new Date(task.duedate)) === "tomorrow"
  );
  const upcomingTask = AllTask.filter(
    (task) => CatogorizedTask(new Date(task.duedate)) === "upcoming"
  );
  const somedayTask = AllTask.filter(
    (task) => CatogorizedTask(new Date(task.duedate)) === "someday"
  );
  return (
    <div className="AllTask">
      <PersonalTaskTools />
      <div className="AllTaskFlex">
        <div className="AllTaskContainer-1">
          <div className="AllTaskBox">
            <section className="task-section">
                <div className="task-subsection">
                  <h2>Today</h2> 
                  <ul>
                    {todayTask.map(task =>
                        <div className="task-subflex"> 
                            <input type="checkbox" />
                            <li key={task.id}>{task.text}</li>
                        </div>
                    )}
                  </ul>
                </div>
                <div className="task-subsection">
                <h2>Tomoorrow</h2> 
                  <ul>
                    {tomorrowTask.map(task =>
                        <div className="task-subflex"> 
                            <input type="checkbox" />
                            <li key={task.id}>{task.text}</li>
                        </div>
                    )}
                  </ul>
                </div>
                <div className="task-subsection">
                <h2>Upcoming</h2> 
                  <ul>
                    {upcomingTask.map(task =>
                        <div className="task-subflex"> 
                            <input type="checkbox" />
                            <li key={task.id}>{task.text}</li>
                        </div>
                    )}
                  </ul>
                </div>
                <div className="task-subsection">
                <h2>Someday</h2> 
                  <ul>
                    {somedayTask.map(task =>
                        <div className="task-subflex"> 
                            <input type="checkbox" />
                            <li key={task.id}>{task.text}</li>
                        </div>
                    )}
                  </ul>
                </div>
            </section>
          </div>
          <div className="AllTaskInput">
            <form action="">
              <input type="text" />
              <button type="submit">
                <FaArrowUp />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTask;
