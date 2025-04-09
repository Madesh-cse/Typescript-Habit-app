import "../../styles/Components/_personalTaskTools.scss"
import WeekScheduleTools from "./WeekScheduleTools"
import TaskCard from "./TaskCard"
function WeekScheduleList() {

  return (
    <>
    <div className="weekSchedule"> 
      <WeekScheduleTools/>
      <TaskCard/>
    </div>
    </>
  )
}

export default WeekScheduleList