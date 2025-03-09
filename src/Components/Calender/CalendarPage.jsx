import React, { useState } from "react";
import "../../Css/CalendarPage.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventInput, setEventInput] = useState("");

  const month = date.getMonth();
  const year = date.getFullYear();
  const today = new Date();

  // Navigate to previous month
  const prevMonth = () => {
    setDate(new Date(year, month - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setDate(new Date(year, month + 1, 1));
  };

  // Helper to format date keys as "YYYY-MM-DD"
  const getDateKey = (d) => {
    const y = d.getFullYear();
    const m = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${y}-${m}-${day}`;
  };

  // Calculate number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Get the weekday of the first day of the month (0 = Sunday, 6 = Saturday)
  const startDay = new Date(year, month, 1).getDay();

  // Create weeks array for calendar grid
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

  // Open modal to add event on a given day
  const handleDayClick = (day) => {
    if (!day) return;
    const clickedDate = new Date(year, month, day);
    setSelectedDay(clickedDate);
    setEventInput("");
  };

  // Add event to the selected day
  const addEvent = () => {
    if (eventInput.trim() === "") return;
    const key = getDateKey(selectedDay);
    const existingEvents = events[key] || [];
    setEvents({
      ...events,
      [key]: [...existingEvents, eventInput]
    });
    setSelectedDay(null);
    setEventInput("");
  };

  // Close the modal without adding an event
  const closeModal = () => {
    setSelectedDay(null);
    setEventInput("");
  };

  return (
    <div className="calendar-container">
      <h1 style={{fontSize:'1.5rem',alignItems:'center',justifyContent:'center'}}>Available Dates</h1>
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt; Prev</button>
        <h2>
          {date.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={nextMonth}>Next &gt;</button>
        {/* <button onClick={goToToday}>Today</button> */}
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
            const cellDate = day ? new Date(year, month, day) : null;
            const key = cellDate ? getDateKey(cellDate) : "";
            const dayEvents = key ? events[key] : [];
            // Highlight today's cell
            const isToday =
              cellDate &&
              cellDate.getDate() === today.getDate() &&
              cellDate.getMonth() === today.getMonth() &&
              cellDate.getFullYear() === today.getFullYear();

            return (
              <div
                key={`${i}-${j}`}
                className={`day-cell ${isToday ? "today" : ""}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="day-number">{day ? day : ""}</div>
                {dayEvents && dayEvents.length > 0 && (
                  <ul className="events-list">
                    {dayEvents.map((event, index) => (
                      <li key={index} className="event-item">
                        {event}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal for adding events */}
      {selectedDay && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>
              Add Event for{" "}
              {selectedDay.toLocaleDateString("default", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </h3>
            <input
              type="text"
              value={eventInput}
              onChange={(e) => setEventInput(e.target.value)}
              placeholder="Event details"
            />
            <div className="modal-buttons">
              <button onClick={addEvent}>Add Event</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
