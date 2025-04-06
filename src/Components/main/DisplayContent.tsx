import { useInputContext } from "../../Context/InputSubmissonContext"
import '../../styles/Components/_displaycontent.scss'
import { IoLockClosedOutline } from "react-icons/io5";

function DisplayContent() {

    const{ submittedValue,toggleCompleted} = useInputContext()

  return (
    <>
    <div className="display-box">
    <ul>
        {submittedValue.map((task,index)=>(
            <div className="Content-box">
                <div className="radio-input">
                  <input type="radio"  checked={task.completed} onChange={() => toggleCompleted(index)}/>
                </div>
                <div className="list-name">
                   <p><span><IoLockClosedOutline/></span> My list - Personal</p>
                   <li key={index}>{task.text}</li>
                </div>
            </div>
        ))}
       </ul>
    </div>
    </>
  )
}

export default DisplayContent