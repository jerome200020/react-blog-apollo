import './../styles/App.css';
import Login from './Login';
import BlogList from './BlogList';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="auth-wrapper">
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/new/1" />}/>
          <Route path="/new/:page" element={<BlogList />} />
        </Routes>
      </div>
  );
}

export default App;
