import { NavLink } from "react-router-dom";
import '../../styles/Components/_sidebar.scss'
import { useInputContext } from "../../Context/InputSubmissonContext";
interface MylistProps {

    listContent:string[] | null
    WorkCount : number
}

function Mylist({listContent,WorkCount}:MylistProps) {

    const {submittedValue} = useInputContext()

    const totalTask = Object.values(submittedValue).reduce(
        (total,tasks) => total + tasks.length,0
    )
  return (
    <div className='sidebar-list'>
    <ul>
       <li>
           <NavLink to='/Personal'>
               <span>Personal</span>
               <span className="count">{totalTask}</span>
           </NavLink>
       </li>
       <li>
           <NavLink to='/Work'>
               <span>Work</span>
               <span className="count">{WorkCount}</span>
           </NavLink>
       </li>
       <li>
           <NavLink to='/WorkList'>
               <span>Grocery List</span>
           </NavLink>
       </li>
       <li>
           <NavLink to='/Project'>
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