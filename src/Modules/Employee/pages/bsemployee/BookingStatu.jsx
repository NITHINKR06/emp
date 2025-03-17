import React, { useState } from 'react';
import BSEmployee from '../../../../Components/BookingStatus/BSEmployee';
import ESearch from '../../../../Components/SearchBox/ESearch';

export default function BookingStatu() {
  // Create a state object to hold all search/filter details.
  const [filters, setFilters] = useState({
    searchTerm: '',
    date: '',
    time: '',
    location: '',
  });

  return (
    <div style={{ marginTop: '100px' }}>
      {/* Pass filters and setFilters to ESearch so it can update the search details */}
      <ESearch filters={filters} setFilters={setFilters} />  
      <div>
        {/* Pass filters to BSEmployee so it can filter the bookings accordingly */}
        <BSEmployee filters={filters} />
      </div>
    </div>
  );
}
