import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TaskModal from '../components/TaskModal';

function Calendar() {
  const { tasks } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days
  const calendarDays = [];
  const current = new Date(startDate);
  
  for (let week = 0; week < 6; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    calendarDays.push(weekDays);
    
    // Stop if we've passed the end of the month and completed the week
    if (current.getMonth() !== month && day === 6) break;
  }

  // Get tasks for a specific date
  const getTasksForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
      return taskDate === dateString;
    });
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === month;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              View and manage your tasks in calendar format.
            </p>
          </div>
          <button
            onClick={goToToday}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Today
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Calendar Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {monthNames[month]} {year}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-px mb-2">
            {weekDays.map(day => (
              <div key={day} className="py-2 text-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            {calendarDays.map((week, weekIndex) =>
              week.map((date, dayIndex) => {
                const dayTasks = getTasksForDate(date);
                const isCurrentMonthDay = isCurrentMonth(date);
                const isTodayDate = isToday(date);

                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`min-h-[120px] bg-white dark:bg-gray-800 p-2 ${
                      !isCurrentMonthDay ? 'opacity-40' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-medium ${
                          isTodayDate
                            ? 'bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                            : isCurrentMonthDay
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-400'
                        }`}
                      >
                        {date.getDate()}
                      </span>
                    </div>

                    {/* Tasks for this day */}
                    <div className="space-y-1">
                      {dayTasks.slice(0, 2).map(task => (
                        <button
                          key={task.id}
                          onClick={() => handleTaskClick(task)}
                          className={`w-full text-left p-1 rounded text-xs border ${
                            task.completed 
                              ? 'bg-gray-100 text-gray-500 border-gray-200 line-through dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600'
                              : getPriorityColor(task.priority)
                          } hover:opacity-80 transition-opacity`}
                        >
                          <div className="truncate font-medium">
                            {task.title}
                          </div>
                          {task.priority && !task.completed && (
                            <div className="text-xs opacity-75">
                              {task.priority} priority
                            </div>
                          )}
                        </button>
                      ))}
                      
                      {dayTasks.length > 2 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                          +{dayTasks.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Priority Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded mr-2 dark:bg-red-900/20 dark:border-red-800"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">High Priority</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded mr-2 dark:bg-yellow-900/20 dark:border-yellow-800"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Medium Priority</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-2 dark:bg-green-900/20 dark:border-green-800"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Low Priority</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded mr-2 dark:bg-gray-700 dark:border-gray-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default Calendar;