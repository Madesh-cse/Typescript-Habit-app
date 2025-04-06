import { useInputContext } from "../../Context/InputSubmissonContext"
import { IoLockClosedOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CgNotifications } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import '../../styles/Components/_suggestion.scss'
import { HiMiniBars3BottomLeft } from "react-icons/hi2";

function Suggestion() {

  const{ submittedValue} = useInputContext()

  return (
    <section>
        <div className='Suggestion'>
          <div className="helping-tool">
            <div className="tools-1">
              <span><BsStars/></span>
              <p>Suggestions</p>
            </div>
            <div className="tools-2">
              <span><TfiReload/></span>
              <span><TfiHeadphoneAlt/></span>
              <span><CgNotifications/></span>
              <span><IoSearch/></span>
            </div>
          </div>
          <div className="Filter-input">
            <input type="text" placeholder="Filter" />
            <span><HiMiniBars3BottomLeft/></span>
          </div>
          <div className="suggestion-list">
            <ul>
              {submittedValue.map((task,index)=>(
                <div className="Suggestion-box">
                  <div className="addition-feature">
                    <p><FaPlus/></p>
                  </div>
                  <div className="list-name">
                    <p><span><IoLockClosedOutline/></span> My list - Personal</p>
                    <li key={index}>{task.text}</li>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
    </section>
  )
}

export default Suggestion