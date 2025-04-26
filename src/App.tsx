import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login, Signup } from './components/auth/auth';
import { Dashboard, Home, Profile, Welcome, Vault, Error, Coco } from './components/pages';
import ForgotPassword from './components/auth/Login/ForgotPassword';
import EditImage from './components/pages/EditImage/EditImage';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ui/Toast/Toast';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="App">
            <ToastContainer />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/resetpassword' element={<ForgotPassword />} />

              <Route path="/" element={<Home />}>
                <Route index element={<Welcome />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="vault" element={<Vault />} />
                <Route path="profile" element={<Profile />} />
                <Route path="edit-image" element={<EditImage />} />
                <Route path="coco" element={<Coco />} />
                <Route path="*" element={<Error />} />
              </Route>

            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
