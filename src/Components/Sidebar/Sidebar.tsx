import '../../styles/Components/_sidebar.scss'
import { useState } from 'react';
import { useRef } from 'react';
import Main from '../main/Main'
import Suggestion from '../main/Suggestion'
import { IoSettingsOutline } from "react-icons/io5";
import { TbCircleDashedCheck } from "react-icons/tb";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import Modal from '../Modal/ListModal';
import Mylist from './Mylist';
function Sidebar() {

    const [isopen,setopen] = useState<boolean>(false);
    const[submittedValue,setsubmittedValue] = useState<string[]>([])

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
            <div className='sidebar'>
                <div className='sidebar_title'>
                    <p className='logo'><IoSettingsOutline/></p>
                    <div className='user_name'>
                        <h3>Madesh</h3>
                        <p>Free Plan</p>
                    </div>
                </div>
               <button className='preminum-btn'>Go Preminum</button>
               <div className='sidebar-list'>
                 <ul>
                    <li>
                        <NavLink to=''>
                            <span><TbCircleDashedCheck/></span>
                            <span>My day</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to=''>
                            <span><IoCalendarNumberSharp/></span>
                            <span>Next 7 days</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to=''>
                            <span><FaTasks/>    </span>
                            <span>All my task</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to=''>
                            <span><IoCalendarNumberSharp/></span>
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
                    {!isopen ? <Mylist listContent = {submittedValue}/>:''}
               </div>
            </div>
        </aside>
        <Main/>
        <Modal ref={ref} onSubmit={(HandleSubmite)}/>
        <Suggestion/>
    </div>
  )
}

export default Sidebar