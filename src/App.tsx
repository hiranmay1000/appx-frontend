import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login, Signup } from './components/auth/auth';
import { Dashboard, Home, Profile, Welcome, Vault, Error} from './components/pages';
import ForgotPassword from './components/auth/Login/ForgotPassword';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/resetpassword' element={<ForgotPassword/>} />
            
            <Route path="/" element={<Home />}>
              <Route index element={<Welcome />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="vault" element={<Vault />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Error />} />
            </Route>

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
