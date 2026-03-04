import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { createExpense } from '../services/api'

const AddExpense = () => {
  const [form, setForm] = useState({ expenseName: '', amount: '', date: '', description: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createExpense({
        expenseName: form.expenseName,
        amount: parseFloat(form.amount),
        date: form.date,
        description: form.description,
      })
      setSuccess('Expense added successfully!')
      setForm({ expenseName: '', amount: '', date: '', description: '' })
      setTimeout(() => navigate('/expenses'), 1000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-2 py-2 border border-gray-300 rounded text-sm outline-none focus:border-gray-400"
  const labelClass = "block text-sm text-black-600 text-bold font-bold mb-1"

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 min-h-screen px-5 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-md px-10 py-8 shadow-sm">
          <h2 className="text-xl font-bold text-center text-gray-700 mb-6">Add New Expense</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className={labelClass}>Expense Name:</label>
              <input type="text" name="expenseName" value={form.expenseName} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="mb-3">
              <label className={labelClass}>Amount:</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} min="0.01" step="0.01" required className={inputClass} />
            </div>
            <div className="mb-3">
              <label className={labelClass}>Date:</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="mb-3">
              <label className={labelClass}>Description:</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${inputClass} resize-y`} />
            </div>
            {error && <p className="text-red-700 text-xs mt-2 text-center">{error}</p>}
            {success && <p className="text-green-700 text-xs mt-2 text-center">{success}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded cursor-pointer border-none"
            >
              {loading ? 'Adding...' : 'Add Expense'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddExpense
