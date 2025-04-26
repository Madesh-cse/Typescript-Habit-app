import { useState } from "react";
import { useInputContext } from "../../Context/InputSubmissonContext";
import { IoLockClosedOutline, IoSearch } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { TfiReload, TfiHeadphoneAlt } from "react-icons/tfi";
import { CgNotifications } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import '../../styles/Components/_suggestion.scss';
import { useWorkContext } from "../../Context/WorkInputSubmissionContext";


function Suggestion() {
  const { submittedValue } = useInputContext();
  const {WorkTasks} = useWorkContext()

  const [filterText,setfilterText] = useState('')

  const lowerFilter = filterText.toLocaleLowerCase()

  return (
    <section>
      <div className='Suggestion'>
        {/* Top tools */}
        <div className="helping-tool">
          <div className="tools-1">
            <span><BsStars /></span>
            <p>Suggestions</p>
          </div>
          <div className="tools-2">
            <span><TfiReload /></span>
            <span><TfiHeadphoneAlt /></span>
            <span><CgNotifications /></span>
            <span><IoSearch /></span>
          </div>
        </div>

        {/* Filter input */}
        <div className="Filter-input">
          <input type="text" placeholder="Filter" onChange={(e)=>setfilterText(e.target.value)} />
          <span><HiMiniBars3BottomLeft /></span>
        </div>

        {/* Suggestion list */}
        <div className="suggestion-list">
          <ul>
            {Object.entries(submittedValue).map(([day, tasks]) =>
              tasks.filter((task)=>task.text.toLocaleLowerCase().includes(lowerFilter)).map((task, index) => (
                <div className="Suggestion-box" key={`${day}-${index}`}>
                  <div className="addition-feature">
                    <p><FaPlus /></p>
                  </div>
                  <div className="list-name">
                    <p>
                      <span><IoLockClosedOutline /></span> My list - {day}
                    </p>
                    <li className={task.completed ? 'completed' : ''}>
                      {task.text}
                    </li>
                  </div>
                </div>
              ))
            )}

             {/* Work list */}

           {Object.entries(WorkTasks).map(([day, work]) =>
              work.filter((work)=>work.Work.toLocaleLowerCase().includes(lowerFilter)).map((works, index) => (
                <div className="Suggestion-box" key={`work-${day}-${index}`}>
                  <div className="addition-feature">
                    <p><FaPlus /></p>
                  </div>
                  <div className="list-name">
                    <p><span><IoLockClosedOutline /></span> Work list - {day}</p>
                    <li className={works.complete ? 'completed' : ''}>
                      {works.Work}
                    </li>
                  </div>
                </div>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Suggestion;
