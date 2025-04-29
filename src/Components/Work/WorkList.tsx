import Sidebar from "../Sidebar/Sidebar"
import '../../styles/Components/_workList.scss'
import WorkTask from "./WorkTask"
function WorkList() {
  return (
    <div className="Work-Container">
        <Sidebar/>
        <WorkTask/>
    </div>
  )
}

export default WorkList