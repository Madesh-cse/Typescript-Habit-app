import { NavLink } from "react-router-dom";
import { TbCircleDashedCheck } from "react-icons/tb";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
function Mylist() {
  return (
    <div className='sidebar-list'>
    <ul>
       <li>
           <NavLink to=''>
               <span><TbCircleDashedCheck/></span>
               <span>Personal</span>
           </NavLink>
       </li>
       <li>
           <NavLink to=''>
               <span><IoCalendarNumberSharp/></span>
               <span>Work</span>
           </NavLink>
       </li>
       <li>
           <NavLink to=''>
               <span><FaTasks/>    </span>
               <span>Grocery List</span>
           </NavLink>
       </li>
       <li>
           <NavLink to=''>
               <span><IoCalendarNumberSharp/></span>
               <span>Project</span>
           </NavLink>
       </li>
    </ul>
  </div>
  )
}

export default Mylist