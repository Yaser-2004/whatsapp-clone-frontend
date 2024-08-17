import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import WhatsappContainer from './Components/WContainer/WhatsappContainer';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import { useAuthContext } from './context/AuthContext';

function App() {

  const {authUser} = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={authUser ? <Navigate to="/home" /> : <Login />} />
          <Route path='/register' element={authUser ? <Navigate to="/home" /> : <Register />} />
          <Route path='/home' element={authUser ? <WhatsappContainer /> : <Navigate to="/" />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}


export default App;

