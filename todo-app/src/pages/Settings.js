import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Settings() {
  const { user, darkMode, dispatch } = useApp();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    taskReminders: true,
    weeklyDigest: true,
  });
  const [preferences, setPreferences] = useState({
    defaultPriority: 'medium',
    taskView: 'card',
    startOfWeek: 'sunday',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      name: profileData.name,
      email: profileData.email,
    };
    dispatch({ type: 'SET_USER', payload: updatedUser });
    alert('Profile updated successfully!');
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Update your personal information.
            </p>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="flex items-center space-x-4">
              <img
                className="h-20 w-20 rounded-full"
                src={user?.avatar}
                alt={user?.name}
              />
              <div className="flex-1">
                <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
                  Change Avatar
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Appearance</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Customize how the app looks and feels.
            </p>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle between light and dark themes.
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  darkMode ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Choose how you want to be notified about updates and reminders.
            </p>
          </div>
          <div className="px-6 py-4 space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {key === 'email' && 'Receive notifications via email'}
                    {key === 'push' && 'Receive push notifications in your browser'}
                    {key === 'taskReminders' && 'Get reminded about upcoming tasks'}
                    {key === 'weeklyDigest' && 'Receive a weekly summary of your tasks'}
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange(key)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    value ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      value ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Preferences</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Customize your app experience.
            </p>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="defaultPriority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Default Priority
                </label>
                <select
                  id="defaultPriority"
                  name="defaultPriority"
                  value={preferences.defaultPriority}
                  onChange={handlePreferenceChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label htmlFor="taskView" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Task View
                </label>
                <select
                  id="taskView"
                  name="taskView"
                  value={preferences.taskView}
                  onChange={handlePreferenceChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="card">Card View</option>
                  <option value="list">List View</option>
                  <option value="compact">Compact View</option>
                </select>
              </div>
              <div>
                <label htmlFor="startOfWeek" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start of Week
                </label>
                <select
                  id="startOfWeek"
                  name="startOfWeek"
                  value={preferences.startOfWeek}
                  onChange={handlePreferenceChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Data Management</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Manage your data and account.
            </p>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Export Data
              </button>
              <button className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Clear Completed Tasks
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Delete All Data
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ⚠️ Data management actions cannot be undone. Please use with caution.
            </p>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">About</h2>
          </div>
          <div className="px-6 py-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p><strong>TodoApp</strong> v1.0.0</p>
              <p>A beautiful and responsive task management application built with React and Tailwind CSS.</p>
              <p>Features include task management, calendar view, dark mode, and local data persistence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;