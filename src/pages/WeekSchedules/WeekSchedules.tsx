import WeekScheduleList from "../../Components/WeekSchedule/WeekScheduleList"
import Sidebar from "../../Components/Sidebar/Sidebar"
import '../../styles/Components/_weekschedule.scss'

function WeekSchedules() {
  return (
    <main>
      <div className="Weekschedule-flex">
        <Sidebar/>
        <WeekScheduleList/>
      </div>
    </main>
  )
}

export default WeekSchedules