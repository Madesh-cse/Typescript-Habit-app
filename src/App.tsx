import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import './styles/main.scss';

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Home/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
