import React, { useState } from 'react';
import PanelBase from './PanelBase';
import './CalendarPanel.css';

const CalendarPanel = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(27);
  
  const events = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', color: '#3498db' },
    { id: 2, title: 'Project Review', time: '2:00 PM', color: '#e74c3c' },
    { id: 3, title: 'Client Call', time: '4:30 PM', color: '#27ae60' },
  ];

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <PanelBase title="Calendar" onClose={onClose} className="calendar-panel">
      <div className="panel-section">
        <div className="calendar-header">
          <button className="calendar-nav" aria-label="Previous month">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <span className="calendar-month">December 2025</span>
          <button className="calendar-nav" aria-label="Next month">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <div className="calendar-grid" role="grid" aria-label="December 2025 calendar">
          <div className="calendar-days" role="row">
            {days.map((day, i) => (
              <span key={i} className="calendar-day-label" role="columnheader">{day}</span>
            ))}
          </div>
          <div className="calendar-dates" role="rowgroup">
            {dates.map((date) => (
              <button
                key={date}
                className={`calendar-date ${selectedDate === date ? 'selected' : ''} ${date === 27 ? 'today' : ''}`}
                onClick={() => setSelectedDate(date)}
                aria-label={`December ${date}, 2025${date === 27 ? ', today' : ''}`}
                aria-pressed={selectedDate === date}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel-section">
        <h3 className="panel-section-title">Today's Events</h3>
        <ul className="events-list" role="list" aria-label="Events for today">
          {events.map((event) => (
            <li key={event.id}>
              <button className="event-item" aria-label={`${event.title} at ${event.time}`}>
                <span className="event-indicator" style={{ background: event.color }} aria-hidden="true"></span>
                <span className="event-content">
                  <span className="event-title">{event.title}</span>
                  <span className="event-time">{event.time}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </PanelBase>
  );
};

export default CalendarPanel;
