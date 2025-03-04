import React from 'react';
import BookingStatus from '../../../../Components/BookingStatus/BookingStatus';
import Search from '../../../../Components/SearchBox/Search';

export default function BookingStatu() {
  return (
    <div
      style={{
        marginTop: '45px', // equivalent to mt-10
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column', // stacking Search above BookingStatus
      }}
    >
      <Search />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem', // equivalent to p-4
        }}
      >
        <BookingStatus />
      </div>
    </div>
  );
}
