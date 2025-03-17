import React, { useState, useEffect } from "react";
import "../../Css/CalendarPage.css";
import axios from "axios";

function CalendarPage({ userId, employeeId }) {
  const [date, setDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";
  
  const month = date.getMonth();
  const year = date.getFullYear();
  const today = new Date();

  // Fetch booking data for the given user and employee.
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/bookings/user/${userId}/employee/${employeeId}`
        );
        setBookings(response.data);
        console.log("Fetched bookings:", response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    if (userId && employeeId) {
      fetchBookings();
    }
  }, [userId, employeeId, BASE_URL]);

  // Helper function to format dates as YYYY-MM-DD.
  const formatDate = (d) => {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // Calculate the number of days in the month and the start day.
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  // Create weeks array for calendar grid.
  const weeks = [];
  let dayCounter = 1;
  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startDay) {
        week.push(null);
      } else if (dayCounter > daysInMonth) {
        week.push(null);
      } else {
        week.push(dayCounter);
        dayCounter++;
      }
    }
    weeks.push(week);
  }

  // Navigation functions.
  const prevMonth = () => {
    setDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt; Prev</button>
        <h2>
          {date.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={nextMonth}>Next &gt;</button>
      </div>
      <div className="calendar-grid">
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
        {/* Calendar cells */}
        {weeks.map((week, i) =>
          week.map((day, j) => {
            if (!day) {
              return <div key={`${i}-${j}`} className="day-cell"></div>;
            }
            const cellDate = new Date(year, month, day);
            const formattedCellDate = formatDate(cellDate);

            // Find if there is a booking on this date.
            const bookingForDate = bookings.find((booking) => {
              const bookingDate = new Date(booking.bookingDate);
              return formatDate(bookingDate) === formattedCellDate;
            });

            // Determine cell class based on booking existence and status.
            let cellClass = "day-cell";
            if (bookingForDate) {
              // If status exists, check for confirmed/pending; otherwise default to confirmed.
              if (bookingForDate.status) {
                if (bookingForDate.status === "confirmed") {
                  cellClass += " booking-confirmed";
                } else if (bookingForDate.status === "pending") {
                  cellClass += " booking-pending";
                }
              } else {
                cellClass += " booking-confirmed";
              }
            } else if (cellDate.toDateString() === today.toDateString()) {
              cellClass += " current-day";
            }

            return (
              <div key={`${i}-${j}`} className={cellClass}>
                <div className="day-number">{day}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
