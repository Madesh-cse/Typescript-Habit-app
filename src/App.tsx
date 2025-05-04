import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Router>
      <SubmissionProvider>
        <WorkTaskProvider> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/work" element={<Work />} />
            <Route path="/weekschedule" element={<WeekSchedules />} />
            <Route path="/alltask" element={<AllMyTask />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WorkTaskProvider>
      </SubmissionProvider>
    </Router>
  );
}

export default App;