
import './App.css';
import {Routes,Route,BrowserRouter as Router} from 'react-router-dom'
import Chat from './pages/chat';
import Register from './pages/register';
import Login from './pages/login';
import SetAvatar from './componet/setAvatar';
import ErrorPage from './pages/ErrorPage';
import PrivateOutlet from './pages/PrivateRoute'

function App() {
  return (
   <>
   <Router>
     <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/*" element={<PrivateOutlet />}>
            <Route exact path="register" element={<Register />} />
            <Route exact path="setAvatar" element={<SetAvatar />} />
            <Route exact path="chat" element={<Chat />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
