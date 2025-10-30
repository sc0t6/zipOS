import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  color: string;
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2025, 9, 29, 10, 0),
    time: '10:00 AM',
    color: 'bg-blue-500',
  },
  {
    id: '2',
    title: 'Lunch with Client',
    date: new Date(2025, 9, 29, 12, 30),
    time: '12:30 PM',
    color: 'bg-green-500',
  },
  {
    id: '3',
    title: 'Project Review',
    date: new Date(2025, 9, 30, 14, 0),
    time: '2:00 PM',
    color: 'bg-purple-500',
  },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(sampleEvents);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="h-full flex bg-white dark:bg-gray-900">
      {/* Calendar */}
      <div className="flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5 dark:text-gray-300" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2 flex-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
            const isToday = 
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear();
            const isSelected =
              date.getDate() === selectedDate.getDate() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getFullYear() === selectedDate.getFullYear();
            const dayEvents = getEventsForDate(date);

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(date)}
                className={`aspect-square rounded-lg p-2 transition-colors ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : isToday
                    ? 'bg-blue-100 dark:bg-blue-900 dark:text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300'
                }`}
              >
                <div className="text-sm">{i + 1}</div>
                {dayEvents.length > 0 && (
                  <div className="flex gap-0.5 mt-1 justify-center">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : event.color}`}
                      ></div>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Sidebar */}
      <div className="w-80 border-l border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="dark:text-white">
              {selectedDate.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric' 
              })}
            </h3>
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map(event => (
                <div
                  key={event.id}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 dark:border-opacity-100"
                  style={{ borderLeftColor: event.color.replace('bg-', '') }}
                >
                  <div className="dark:text-white mb-1">{event.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{event.time}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              No events for this day
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
