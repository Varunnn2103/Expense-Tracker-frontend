import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import AddExpense from './pages/AddExpense.jsx'
import UpdateExpense from './pages/UpdateExpense.jsx'
import ExpenseList from './pages/ExpenseList.jsx'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/add-expense" element={<PrivateRoute><AddExpense /></PrivateRoute>} />
          <Route path="/update-expense/:id" element={<PrivateRoute><UpdateExpense /></PrivateRoute>} />
          <Route path="/expenses" element={<PrivateRoute><ExpenseList /></PrivateRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
