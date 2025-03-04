import React from 'react'
import Home from '../../Home'
import { Route, Routes } from 'react-router-dom'
import Booking from '../pages/booking/page'
import BookingStatu from '../pages/bookingStatus/BookingStatu'
import Payment from '../pages/bookingStatus/[id]/Payment'

export default function URoute() {
  return (
    <div>
    {/* <ResAppbar/> */}
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/booking' element={<Booking/>} />
          <Route path='/booking/status' element={<BookingStatu/>} />
          <Route path='/booking/status/:id' element={<Payment/>} />
          {/* <Route path='/Manageuser/:id' element={<Manageuser/>} /> */}
          {/* <Route path='/StudentRegister' element={<StudentRegister/>} /> */}
      </Routes>
    </div>
  )
}
