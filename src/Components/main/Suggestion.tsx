import { useInputContext } from "../../Context/InputSubmissonContext"
import { IoLockClosedOutline } from "react-icons/io5";
function Suggestion() {

  const{ submittedValue} = useInputContext()

  return (
    <section>
        <div className='Suggestion'>
          <div className="suggestion-list">
            <ul>
              {submittedValue.map((list,index)=>(
                <div className="list-name">
                  <p><span><IoLockClosedOutline/></span> My list - Personal</p>
                  <li key={index}>{list}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
    </section>
  )
}

export default Suggestion