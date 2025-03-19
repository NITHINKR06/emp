import React, { useEffect } from 'react'
import Home from '../../Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import EmployeeProfile from '../pages/dashboard/EmployeeProfile'
import SettingsPage from '../pages/settings/SettingsPage'
import BookingStatu from '../pages/bsemployee/BookingStatu'
import Cookies from 'js-cookie';

export default function ERoute() {
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
        <Routes>
            <Route 
                path='/' 
                element={
                    <Home/>
                }
            />
            <Route 
                path='/profile' 
                element={
                <EmployeeProfile/>
                } 
            />
            <Route 
                path='/settings' 
                element={
                <SettingsPage/>
                } 
            />
            <Route 
                path='/booking' 
                element={
                <BookingStatu/>
                } 
            />
      </Routes>
    </div>
  )
}
