import "../../styles/Components/_personallist.scss"
import { useInputContext } from "../../Context/InputSubmissonContext"
import { useState } from "react"
import { FaArrowUp } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CgNotifications } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
function PersonalTask() {

  const{ submittedValue,addSubmisson} = useInputContext()

  const[input,setinput] = useState('')

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    if(input.trim()){
      addSubmisson(input.trim())
      setinput('')
    }
  }

  return (
    <div className="TaskContainer">
      <div className="TaskContainer-tools">
        <div className="TaskContainer-tools1">
          <span>Work</span> |
          <span><RiContactsLine/>Share</span> |
          <span>View</span> |
        </div>
        <div className="TaskContainer-tools1">
          <span><TfiReload/></span>
          <span><TfiHeadphoneAlt/></span>
          <span><CgNotifications/></span>
          <span><IoSearch/></span>
        </div>
      </div>
      <div className="TaskBox">
        {submittedValue.map((list,index)=>(
          <li key={index}>{list}</li>
        ))}
        </div>
        <div className="TaskInput">
          <form action="" onSubmit={handleSubmit}> 
            <input type="text" value={input} onChange={(e)=>setinput(e.target.value)} placeholder="Add Task"  />
            <button type='submit'><FaArrowUp/></button>
          </form>
      </div>
    </div>
  )
}

export default PersonalTask