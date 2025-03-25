import { NavLink } from "react-router-dom";
import '../../styles/Components/_sidebar.scss'
interface MylistProps {

    listContent:string[] | null
}

function Mylist({listContent}:MylistProps) {

    const listCount = listContent?.length
  return (
    <div className='sidebar-list'>
    <ul>
       <li>
           <NavLink to=''>
               <span>Personal</span>
               <span className="count">{listCount}</span>
           </NavLink>
       </li>
       <li>
           <NavLink to=''>
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