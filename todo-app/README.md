# TodoApp - React + Tailwind CSS

A beautiful, responsive, and modern Todo application built with **React** and **Tailwind CSS**. This app features a clean UI, dark mode support, and comprehensive task management capabilities.

## ✨ Features

### 🎨 **Built with Tailwind CSS**
- **100% Tailwind CSS** - No custom CSS files, everything styled with Tailwind utility classes
- **Responsive Design** - Mobile-first approach with responsive breakpoints (`sm:`, `md:`, `lg:`)
- **Dark Mode** - Toggle between light and dark themes with `dark:` variants
- **Custom Color Palette** - Extended Tailwind theme with primary brand colors
- **Tailwind Forms Plugin** - Enhanced form styling with `@tailwindcss/forms`

### 📱 **Responsive Layout**
- **Mobile-First Design** - Optimized for mobile devices
- **Collapsible Sidebar** - Hidden on mobile, fixed on desktop
- **Adaptive Grid System** - Uses Tailwind's grid and flexbox utilities
- **Touch-Friendly Interface** - Proper sizing for mobile interactions

### 🔐 **Authentication Pages**
- **Login Page** - Centered form with email/password and "Remember Me"
- **Register Page** - User registration with username and password confirmation
- **Responsive Forms** - Styled with Tailwind form utilities

### 📊 **Dashboard**
- **Task Statistics** - Cards showing total, active, completed, and overdue tasks
- **Progress Visualization** - Completion rate with animated progress bar
- **Quick Actions** - Easy access to add tasks and view calendar
- **Recent & Upcoming Tasks** - Preview of task activity

### ✅ **Task Management**
- **Task Lists** - Clean card-based layout for tasks
- **Filter Tabs** - All, Active, Completed, Overdue filters
- **Search Functionality** - Real-time task search
- **Tag System** - Organize tasks with custom tags
- **Priority Levels** - High, Medium, Low priority with color coding
- **Due Date Management** - Date picker with overdue highlighting

### 📅 **Calendar View**
- **Monthly Calendar** - Grid layout showing tasks by date
- **Task Visualization** - Color-coded tasks by priority
- **Interactive** - Click tasks to edit them
- **Navigation** - Previous/Next month navigation

### ⚙️ **Settings Page**
- **Profile Management** - Update user information
- **Dark Mode Toggle** - Switch between light/dark themes
- **Notification Preferences** - Customize notification settings
- **App Preferences** - Default priority, task view options
- **Data Management** - Export, clear, or delete data

### 🎨 **Design System**
- **Consistent Spacing** - Tailwind's spacing scale (`p-4`, `m-6`, etc.)
- **Typography Scale** - Consistent text sizing (`text-sm`, `text-lg`, etc.)
- **Color System** - Semantic color usage with dark mode support
- **Shadow & Border** - Subtle shadows and borders for depth
- **Hover & Focus States** - Interactive feedback for all elements

## 🛠️ **Tailwind CSS Implementation**

### Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
```

### Key Tailwind Features Used

#### **Responsive Design**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
</div>
```

#### **Dark Mode**
```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  {/* Automatically switches based on dark mode state */}
</div>
```

#### **Interactive States**
```jsx
<button className="bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500">
  {/* Hover and focus states for accessibility */}
</button>
```

#### **Component Layouts**
```jsx
<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
  {/* Flexbox layout with consistent spacing */}
</div>
```

## 🚀 **Getting Started**

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd todo-app

# Install dependencies
npm install

# Start the development server
npm start
```

### Dependencies
- **React** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **@tailwindcss/forms** - Form styling plugin

## 📁 **Project Structure**

```
src/
├── components/
│   ├── Layout.js          # Main layout with sidebar
│   └── TaskModal.js       # Add/Edit task modal
├── pages/
│   ├── Login.js           # Authentication page
│   ├── Register.js        # User registration
│   ├── Dashboard.js       # Main dashboard
│   ├── Tasks.js           # Task management
│   ├── Calendar.js        # Calendar view
│   └── Settings.js        # App settings
├── context/
│   └── AppContext.js      # Global state management
└── App.js                 # Main app component
```

## 🎨 **Tailwind Utilities Used**

### Layout & Spacing
- `flex`, `grid`, `space-x-4`, `gap-6`
- `p-4`, `px-6`, `py-2`, `m-4`, `mt-8`
- `w-full`, `h-screen`, `min-h-screen`

### Colors & Theming
- `bg-white`, `dark:bg-gray-800`
- `text-gray-900`, `dark:text-white`
- `border-gray-200`, `dark:border-gray-700`

### Typography
- `text-sm`, `text-lg`, `text-3xl`
- `font-medium`, `font-bold`
- `leading-5`, `tracking-wide`

### Interactive Elements
- `hover:bg-gray-50`, `focus:ring-2`
- `transition-colors`, `duration-200`
- `cursor-pointer`, `select-none`

### Responsive Design
- `sm:flex-row`, `md:grid-cols-2`, `lg:w-64`
- `hidden lg:flex`, `block sm:hidden`

## 🌙 **Dark Mode Implementation**

Dark mode is implemented using Tailwind's `dark:` variant system:

```jsx
// Toggle dark mode
const toggleDarkMode = () => {
  dispatch({ type: 'TOGGLE_DARK_MODE' });
};

// Apply to document
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
```

## 📱 **Mobile Responsiveness**

The app is fully responsive with:
- **Mobile-first approach** using Tailwind's responsive prefixes
- **Collapsible sidebar** that becomes a mobile drawer
- **Touch-friendly buttons** with proper sizing
- **Responsive grids** that adapt to screen size
- **Optimized forms** for mobile input

## 🎯 **Performance Features**

- **Local Storage** - Persistent data without backend
- **Optimized Re-renders** - React Context with useReducer
- **Lazy Loading** - Route-based code splitting ready
- **Minimal Bundle** - Only necessary Tailwind classes included

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using React and Tailwind CSS**
