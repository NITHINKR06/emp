import React from 'react'
import Home from '../../Home'
import { Route, Routes } from 'react-router-dom'
import EmployeeProfile from '../pages/dashboard/EmployeeProfile'
import SettingsPage from '../pages/settings/SettingsPage'
import BookingStatu from '../pages/bsemployee/BookingStatu'

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
