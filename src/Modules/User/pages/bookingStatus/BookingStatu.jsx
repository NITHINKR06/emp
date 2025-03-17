import React, { useState } from 'react';
import BookingStatus from '../../../../Components/BookingStatus/BookingStatus';
import ESearch from '../../../../Components/SearchBox/ESearch';

export default function BookingStatu() {
    const [filters, setFilters] = useState({
      searchTerm: '',
      date: '',
      time: '',
      location: '',
    });
  return (
    <div
      style={{
        marginTop:'100px'
    }}
    >
        <ESearch filters={filters} setFilters={setFilters} />  
      <div
      >
        <BookingStatus filters={filters}/>
      </div>
    </div>
  );
}
