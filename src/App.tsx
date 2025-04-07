import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Home from './pages/Home/Home';
import Personal from './pages/Personal/Personal';
import './styles/main.scss';
import { SubmissionProvider } from './Context/InputSubmissonContext';
import Work from './pages/Work/Work';
import WeekSchedules from './pages/WeekSchedules/WeekSchedules';

function App() {
  return (
    <Router>
      <SubmissionProvider>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='Personal' element={<Personal/>}></Route>
          <Route path='Work' element={<Work/>}></Route>
          <Route path='weekschedule' element={<WeekSchedules/>}></Route>
        </Routes>
      </SubmissionProvider>
    </Router>
  )
}

export default App
