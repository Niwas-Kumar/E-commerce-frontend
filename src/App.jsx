import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Items from './pages/Items.jsx'
import Cart from './pages/Cart.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'

function Nav() {
  const { user, logout } = useAuth()
  return (
    <nav className="nav">
      <Link to="/" className="brand">ShopLite</Link>
      <div className="links">
        <Link to="/">Items</Link>
        <Link to="/cart">Cart</Link>
        {user ? (
          <>
            <span className="user">Hi, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

function ProtectedRoute({ children }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function Root() {
  return (
    <AuthProvider>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
