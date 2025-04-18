import { useInputContext } from "../../Context/InputSubmissonContext";
import { IoLockClosedOutline, IoSearch } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { TfiReload, TfiHeadphoneAlt } from "react-icons/tfi";
import { CgNotifications } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import '../../styles/Components/_suggestion.scss';

function Suggestion() {
  const { submittedValue } = useInputContext();

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
          <input type="text" placeholder="Filter" />
          <span><HiMiniBars3BottomLeft /></span>
        </div>

        {/* Suggestion list */}
        <div className="suggestion-list">
          <ul>
            {Object.entries(submittedValue).map(([day, tasks]) =>
              tasks.map((task, index) => (
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
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Suggestion;
