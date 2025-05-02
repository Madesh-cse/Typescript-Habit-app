import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Home from './pages/Home/Home';
import Personal from './pages/Personal/Personal';
import './styles/main.scss';
import { SubmissionProvider } from './Context/InputSubmissonContext';
import { WorkTaskProvider } from './Context/WorkInputSubmissionContext';
import Work from './pages/Work/Work';
import WeekSchedules from './pages/WeekSchedules/WeekSchedules';
import AllMyTask from './pages/AllMyTask/AllMyTask';
import Registration from './Components/Authentication/Registration';
import Login from './Components/Authentication/Login';

function App() {
  return (
    <Router>
      <SubmissionProvider>
        <WorkTaskProvider> 
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='Register'element={<Registration/>}></Route>
            <Route path='Login' element={<Login/>}></Route>
            <Route path='Personal' element={<Personal/>}></Route>
            <Route path='Work' element={<Work/>}></Route>
            <Route path='weekschedule' element={<WeekSchedules/>}></Route>
            <Route path='AllTask' element={<AllMyTask/>}></Route>
          </Routes>
        </WorkTaskProvider>
      </SubmissionProvider>
    </Router>
  )
}

export default App
