import '../../styles/Components/_sidebar.scss'
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { TbCircleDashedCheck } from "react-icons/tb";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal/ListModal';
import Mylist from './Mylist';
import { useInputContext } from '../../Context/InputSubmissonContext';
import { useWorkContext } from '../../Context/WorkInputSubmissionContext';
function Sidebar() {

    const{submittedValue} = useInputContext()

    const{WorkTasks} = useWorkContext()

    const [isToogle,setisToogle] = useState(true)

    useEffect(() => {
        const screenWidth = window.innerWidth;
        console.log("Screen width on mount:", screenWidth); // 🔍 Debug
        if (screenWidth < 1024) {
          setisToogle(false); // Close sidebar initially on small screens
        }
      }, []);

    const HandleOpen = ()=>{
        setisToogle((prev)=>!prev)
    }


    const totalTask = Object.values(submittedValue).reduce(
        (total,task)=> total + task.length ,0
    )

    const WorkCount = Object.values(WorkTasks).reduce(
        (total,work) => total + work.length,0
    )

    const Total = totalTask + WorkCount


    const [isopen,setopen] = useState<boolean>(false);
    const[SubmittedValue,setsubmittedValue] = useState<string[]>([])

    const HandleToggleFunction = ():void=>{
        setopen(prevState=>!prevState)
    }

    // append a new list to the array 
    const HandleSubmite = (value:string)=>{
        setsubmittedValue((prevValue)=>[...prevValue,value])
    }

    const ref = useRef<{ openModal: () => void; closeModal: () => void }>(null)

  return (
    <div className='layout'>
        <aside>
            <div className={`sidebar ${isToogle ? 'open':'closed'}`} >
                <div className='sidebar_title'>
                    <p className='logo'><IoSettingsOutline/></p>
                    <div className='user_name'>
                        <h3>Madesh</h3>
                        <p>Free Plan</p>
                    </div>
                    <div className="sidebar-toggle" onClick={HandleOpen}>
                       {isToogle ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
               <button className='preminum-btn'>Go Preminum</button>
               <div className='sidebar-list'>
                 <ul>
                    <li>
                        <NavLink to='/'className={({ isActive }) => isActive ? "active" : undefined}>
                            <span className='icon'><TbCircleDashedCheck/></span>
                            <span>My day</span>
                            <span className='count'>{Total}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/weekschedule'>
                            <span className='icon'><IoCalendarNumberSharp/></span>
                            <span>Next 7 days</span>
                            <span className='count'>{Total}</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/AllTask'>
                            <span className='icon'><FaTasks/>    </span>
                            <span>All my task</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Calender'>
                            <span className='icon'><IoCalendarNumberSharp/></span>
                            <span>My calender</span>
                        </NavLink>
                    </li>
                 </ul>
               </div>
               <div className='toggle-sidebar'>
                    <div className='toggle-sidebar-flex'>
                        <div className='toogle-title'>
                            <p onClick={HandleToggleFunction}>My lists  <span><IoLockClosedOutline/></span></p>
                        </div>
                        <p className='toggle-btn' onClick={(()=>ref.current?.openModal())}><FaPlus/></p>
                    </div>
                    {!isopen ? <Mylist listContent = {SubmittedValue} WorkCount = {WorkCount}/>:''}
               </div>
            </div>
        </aside>
        <Modal ref={ref} onSubmit={(HandleSubmite)}/>
    </div>
  )
}

export default Sidebar