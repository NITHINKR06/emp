import React, { useEffect } from 'react'
import Home from '../../Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Booking from '../pages/booking/page'
import BookingStatu from '../pages/bookingStatus/BookingStatu'
import Payment from '../pages/bookingStatus/[id]/Payment'
import SameLayout from '../pages/booking/EmployeeLayout'
import EmployeeProfile from '../pages/dashboard/EmployeeProfile'
import SettingsPage from '../pages/settings/page'
import Cookies from 'js-cookie';

export default function URoute() {
  const navigate = useNavigate('')

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/auth/login');
        return;
      }
    }, []);

  return (
    <div>
    {/* <ResAppbar/> */}
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/booking' element={<Booking/>} />
          <Route path='/booking/status' element={<BookingStatu/>} />
          <Route path='/booking/status/:id' element={<Payment/>} />
          <Route path='/booking/:id' element={<SameLayout/>} />
          <Route path='/profile' element={<EmployeeProfile/>} />
          <Route path='/settings' element={<SettingsPage/>} />
      </Routes>
    </div>
  )
}
