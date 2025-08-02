import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

// Sample tasks for demonstration
const sampleTasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finalize the project proposal for the new client and send it for review.',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    priority: 'high',
    completed: false,
    tags: ['work', 'important'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Get milk, bread, eggs, and vegetables from the store.',
    dueDate: new Date().toISOString().split('T')[0], // Today
    priority: 'medium',
    completed: false,
    tags: ['personal', 'shopping'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Exercise routine',
    description: 'Complete 30-minute workout session.',
    dueDate: new Date().toISOString().split('T')[0], // Today
    priority: 'low',
    completed: true,
    tags: ['health', 'daily'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Team meeting preparation',
    description: 'Prepare slides and agenda for tomorrow\'s team meeting.',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Day after tomorrow
    priority: 'high',
    completed: false,
    tags: ['work', 'meeting'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Read book chapter',
    description: 'Read chapter 5 of "The Clean Code" book.',
    dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday (overdue)
    priority: 'low',
    completed: false,
    tags: ['learning', 'books'],
    createdAt: new Date().toISOString(),
  }
];

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  tasks: JSON.parse(localStorage.getItem('tasks')) || sampleTasks,
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
  filter: 'all', // all, active, completed, overdue
  searchTerm: '',
  selectedTags: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_TAGS':
      return { ...state, selectedTags: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    // Apply dark mode class to document
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Filter and search logic
  const getFilteredTasks = () => {
    let filtered = state.tasks;

    // Filter by status
    if (state.filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (state.filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (state.filter === 'overdue') {
      const today = new Date();
      filtered = filtered.filter(task => 
        !task.completed && new Date(task.dueDate) < today
      );
    }

    // Filter by search term
    if (state.searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // Filter by tags
    if (state.selectedTags.length > 0) {
      filtered = filtered.filter(task =>
        task.tags && task.tags.some(tag => state.selectedTags.includes(tag))
      );
    }

    return filtered;
  };

  const value = {
    ...state,
    dispatch,
    filteredTasks: getFilteredTasks(),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}