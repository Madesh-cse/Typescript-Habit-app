
import "../../styles/Components/_personallist.scss"
import PersonalTask from "./PersonalTask";
import Sidebar from "../Sidebar/Sidebar";

function PersonalList() {

  return (
    <div className="Personal-container">
      <Sidebar/>
      <PersonalTask/>
    </div>
  )
}

export default PersonalList