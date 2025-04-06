import { RiContactsLine } from "react-icons/ri";
import { BsArrowDownUp } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CgNotifications } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import '../../styles/Components/_personalTaskTools.scss'

function PersonalTaskTools() {
  return (
    <div className="TaskContainer-tools">
        <div className="TaskContainer-tools1">
          <span>Personal</span> 
          <span><RiContactsLine/>Share</span>
          <span><BsArrowDownUp/>View</span>
        </div>
        <div className="TaskContainer-tools2">
            <div className="Subtask-tool">
                <span><TfiReload/></span>
                <span><TfiHeadphoneAlt/></span>
                <span><CgNotifications/></span>
                <span><IoSearch/></span>
            </div>
        </div>
      </div>
  )
}

export default PersonalTaskTools