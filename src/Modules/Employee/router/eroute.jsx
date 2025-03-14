import React from 'react'
import Home from '../../Home'
import { Route, Routes } from 'react-router-dom'
import Booking from '../pages/booking/booking'
import EmployeeProfile from '../pages/dashboard/EmployeeProfile'
import SettingsPage from '../pages/settings/SettingsPage'

export default function ERoute() {
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
                path='/booking' 
                element={
                <Booking/>
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
      </Routes>
    </div>
  )
}
