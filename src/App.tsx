import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Personal from './pages/Personal/Personal';
import './styles/main.scss';
import { SubmissionProvider } from './Context/InputSubmissonContext';

function App() {

  return (
    <Router>
      <SubmissionProvider>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='Personal' element={<Personal/>}></Route>
        </Routes>
      </SubmissionProvider>
    </Router>
  )
}

export default App
