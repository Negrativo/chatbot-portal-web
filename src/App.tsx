import './App.css';
import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
import NotFoundScreen from './view/notFound/notFoundScreen';
import Login from './view/login/login';
import Dashboard from './view/dashboard/Dashboard';
import ChatDetails from './view/chatDetail/chatDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat/:chatId" element={<ChatDetails />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
