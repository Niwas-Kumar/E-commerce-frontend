import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login, API_BASE } = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, password })
      login(res.data)
      nav('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="card form-card">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Create account</button>
      </form>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}
