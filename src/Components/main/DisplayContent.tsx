import { useInputContext } from "../../Context/InputSubmissonContext";
import '../../styles/Components/_displaycontent.scss';
import { IoLockClosedOutline } from "react-icons/io5";

function DisplayContent() {
  const { submittedValue, toggleCompleted } = useInputContext();

  return (
    <div className="display-box">
      <ul>
        {Object.entries(submittedValue).map(([day, tasks]) =>
          tasks.map((task, index) => (
            <div className="Content-box" key={`${day}-${index}`}>
              <div className="radio-input">
                <input  
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(day, index)}
                />
              </div>
              <div className="list-name">
                <p>
                  <span><IoLockClosedOutline /></span> My list - {day}
                </p>
                <li className={task.completed ? 'completed' : ''}>{task.text}</li>
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default DisplayContent;
