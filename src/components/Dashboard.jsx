import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Search, Moon, Sun, LogOut, Download, ChevronLeft, ChevronRight, X } from 'lucide-react';

const Dashboard = () => {
  const { token, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const eventsPerPage = 10;

  // Category badges with gradients
  const categoryColors = {
    Work: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
    Personal: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
    Other: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
  };

  // Fetch events logic remains the same
  const fetchEvents = useCallback(async () => {
    try {
      const timeMin = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
      const timeMax = new Date().toISOString();

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&maxResults=2500&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      const sortedEvents = (data.items || []).sort((a, b) => {
        const dateA = new Date(a.start?.dateTime || a.start?.date);
        const dateB = new Date(b.start?.dateTime || b.start?.date);
        return dateB - dateA;
      });

      setEvents(sortedEvents);
      setDisplayedEvents(sortedEvents); // Show all events initially
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [token]);



  // Filter events logic remains the same
  const filterEvents = useCallback(() => {
    let filtered = events;

    // Apply date filter
    if (startDate) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.start?.dateTime || event.start?.date);
        return eventDate >= startDate;
      });
    }

    // Apply search query filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(event =>
        event.summary?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedEvents(filtered);
  }, [events, startDate, searchQuery]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    filterEvents();
  }, [filterEvents]);

  const paginatedEvents = displayedEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const totalPages = Math.ceil(displayedEvents.length / eventsPerPage);

  const exportToCSV = () => {
    const csvContent = displayedEvents
      .map(event => `${event.summary},${event.start?.dateTime || event.start?.date},${event.description || ''}`)
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'events.csv');
    link.click();
  };

  const baseCardClass = darkMode
    ? 'bg-gray-800 text-gray-200'
    : 'bg-white text-gray-800';

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'} min-h-screen transition-colors duration-200`}>
      {/* Navbar with gradient */}
      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                Calendar Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className={`${baseCardClass} rounded-xl p-4 shadow-lg`}>
            <label className="block text-sm font-medium mb-2">Search Events</label>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by event name..."
                className={`pl-10 w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  } p-2 focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>
          </div>

          <div className={`${baseCardClass} rounded-xl p-4 shadow-lg`}>
            <label className="block text-sm font-medium mb-2">Filter by Date</label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              isClearable
              placeholderText="Select a date"
              className={`w-full rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                } p-2 focus:ring-2 focus:ring-blue-500 transition-colors`}
            />
          </div>
        </div>

        {/* Events Table */}
        <div className={`${baseCardClass} rounded-xl shadow-lg overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedEvents.map((event, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedEvent(event)}
                    className={`cursor-pointer transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${categoryColors[event.category || 'Other']}`}>
                          {event.summary}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(event.start?.dateTime || event.start?.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {event.start?.dateTime
                        ? new Date(event.start.dateTime).toLocaleTimeString()
                        : 'All day'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t dark:border-gray-700">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-6">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-colors"
          >
            <Download className="h-5 w-5" />
            <span>Export to CSV</span>
          </button>
        </div>
      </div>


      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className={`${baseCardClass} rounded-xl shadow-xl max-w-md w-full p-6`}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedEvent.summary}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <p className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>{new Date(selectedEvent.start?.dateTime || selectedEvent.start?.date).toLocaleDateString()}</span>
              </p>
              <p>
                Time: {selectedEvent.start?.dateTime
                  ? new Date(selectedEvent.start.dateTime).toLocaleTimeString()
                  : 'All day'}
              </p>
              <p className="text-sm">
                {selectedEvent.description ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                  />
                ) : (
                  'No description available.'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;