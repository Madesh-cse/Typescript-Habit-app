import { useInputContext } from "../../Context/InputSubmissonContext"
import '../../styles/Components/_displaycontent.scss'
import { IoLockClosedOutline } from "react-icons/io5";

function DisplayContent() {

    const{ submittedValue} = useInputContext()

  return (
    <>
    <div className="display-box">
    <ul>
        {submittedValue.map((list,index)=>(
            <div className="Content-box">
                <div className="radio-input">
                    <input type="radio" />
                </div>
                <div className="list-name">
                   <p><span><IoLockClosedOutline/></span> My list - Personal</p>
                   <li key={index}>{list}</li>
                </div>
            </div>
        ))}
       </ul>
    </div>
    </>
  )
}

export default DisplayContent