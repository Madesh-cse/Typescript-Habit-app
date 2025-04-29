import Sidebar from "../Sidebar/Sidebar"
import AllTask from "./AllTask"
import'../../styles/Components/_alltask.scss'
function AllTaskList() {
  return (
    <div className="AllTask-Container">
      <Sidebar/>
      <AllTask/>
    </div>
  )
}

export default AllTaskList