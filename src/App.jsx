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
import Meet from './Pages/Meet';
import ChangePassword from './Pages/ChangePassword';
import DetailBarang from './Pages/DetailBarang';
import DeleteItem from './Pages/DeleteItem';
import Condition from './Pages/Condition';
import ResetPasswordRequest from './Pages/ResetPasswordRequest';
import ResetPassword from './Pages/ResetPassword';
import UserGuide from './Pages/UserGuide';
import AboutUs from './Pages/AboutUs';



import { AuthProvider } from './Components/common/AuthProvider';
import { useState, useEffect } from 'react';
import Coba from './Pages/coba';

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
          <Route path="/coba" element={<Coba />} />
          <Route path="/" element={<HomePage token={token} />} />
          <Route path="/search" element={<HasilPencarian />} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/otherprofile/:userId" element={<OtherProfile />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/delete" element={<DeleteItem />} />
          <Route path="/message" element={<Message />} />
          <Route path="/meet" element={<Meet />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/condition" element={<Condition />} />
          <Route path="/resetpasswordrequest" element={<ResetPasswordRequest/>} />
          <Route path="/detailbarang/:id" element={<DetailBarang />} />   
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route path="/resetpassword" element={<fetch/>} />
          <Route path="/userguide" element={<UserGuide/>} />
          <Route path="/aboutus" element={<AboutUs/>} />


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
