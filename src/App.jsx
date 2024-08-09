import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import HasilPencarian from './Pages/Pencarian';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import OtherProfile from './Pages/OtherProfile';
import Riwayat from './Pages/Riwayat';
import Upload from './Pages/Upload';
import Message from './Pages/Message';
import ChangePassword from './Pages/ChangePassword';
import DetailBarang from './Pages/DetailBarang';
import Condition from './Pages/Condition';
import ResetPasswordRequest from './Pages/ResetPasswordRequest';
import ResetPassword from './Pages/ResetPassword';
import UserGuide from './Pages/UserGuide';
import AboutUs from './Pages/AboutUs';
import ProtectedRoute from './Pages/ProtectedRoute';
import { AuthProvider } from './Components/common/AuthProvider';
import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState(false)
  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage token={token} />} />
          <Route path="/search" element={<HasilPencarian />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otherprofile/:userId" element={<ProtectedRoute><OtherProfile /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/riwayat" element={<ProtectedRoute><Riwayat /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="/message" element={<ProtectedRoute><Message /></ProtectedRoute>} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/condition" element={<Condition />} />
          <Route path="/resetpasswordrequest" element={<ResetPasswordRequest />} />
          <Route path="/detailbarang/:id" element={<DetailBarang />} />   
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/resetpassword" element={<fetch />} />
          <Route path="/userguide" element={<UserGuide />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
