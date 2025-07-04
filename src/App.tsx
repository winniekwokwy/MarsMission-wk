import './App.css'
import Sidebar from './components/SideBar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Routes/Home';
import Quiz from './components/Routes/Quiz';

function App() {

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Quiz' element={<Quiz />} />
        </Routes>
      </Router> 
    </>
  )
}

export default App;
