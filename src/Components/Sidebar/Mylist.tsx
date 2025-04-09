import { NavLink } from "react-router-dom";
import '../../styles/Components/_sidebar.scss'
import { useInputContext } from "../../Context/InputSubmissonContext";
interface MylistProps {

    listContent:string[] | null
}

function Mylist({listContent}:MylistProps) {

    const {submittedValue} = useInputContext()


  return (
    <div className='sidebar-list'>
    <ul>
       <li>
           <NavLink to='/Personal'>
               <span>Personal</span>
               <span className="count">{submittedValue.length}</span>
           </NavLink>
       </li>
       <li>
           <NavLink to='/Work'>
               <span>Work</span>
           </NavLink>
       </li>
       <li>
           <NavLink to=''>
               <span>Grocery List</span>
           </NavLink>
       </li>
       <li>
           <NavLink to=''>
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