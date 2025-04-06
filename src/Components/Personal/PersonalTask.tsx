import "../../styles/Components/_personallist.scss"
import { useInputContext } from "../../Context/InputSubmissonContext"
import { useState } from "react"
import { FaArrowUp } from "react-icons/fa";
import PersonalTaskTools from "./PersonalTaskTools";

function PersonalTask() {

  const{ submittedValue,addSubmisson,toggleCompleted} = useInputContext()

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
      <PersonalTaskTools/>
      <div className="TaskBox">
        {submittedValue.map((task,index)=>(
          <div className="TaskBox-flex">
            <input type="radio"  checked={task.completed} onChange={() => toggleCompleted(index)}/>
            <li className={task.completed ? 'completed' : ''} key={index}>{task.text}</li>
          </div>
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