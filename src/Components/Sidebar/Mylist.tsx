import { NavLink } from "react-router-dom";
import '../../styles/Components/_sidebar.scss'
import { useInputContext } from "../../Context/InputSubmissonContext";
import { TbCircleDashedCheck } from "react-icons/tb";
import { IoCalendarNumberSharp } from "react-icons/io5";
interface MylistProps {

    listContent:string[] | null;
    WorkCount : number;
    isSidebarOpen: boolean;
}

function Mylist({listContent,WorkCount,isSidebarOpen}:MylistProps) {

    const {submittedValue} = useInputContext()

    const totalTask = Object.values(submittedValue).reduce(
        (total,tasks) => total + tasks.length,0
    )
  return (
    <div className={`sidebar-list ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
    <ul>
       <li>
           <NavLink to='/Personal'>
            <span className="icon"><TbCircleDashedCheck/></span>
               <span className="text">Personal</span>
               <span className="count">{totalTask}</span>
           </NavLink>
       </li>
       <li>
           <NavLink to='/Work'>
               <span className="icon"><IoCalendarNumberSharp/></span>
               <span className="text">Work</span>
               <span className="count">{WorkCount}</span>
           </NavLink>
       </li>
       <li>
           <NavLink to='/'>
               <span className="icon"><IoCalendarNumberSharp/></span>
               <span className="text">Grocery List</span>
           </NavLink>
       </li>
       <li>
           <NavLink to='/'>
               <span>Project</span>
           </NavLink>
       </li>
       {listContent?.map((list,index)=>(
        <NavLink to='' key={index}>
            <li>{list}</li>
        </NavLink>
       ))}
    </ul>
  </div>
  )
}

export default Mylist