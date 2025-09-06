import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

export default function Cart() {
  const { API_BASE, token } = useAuth()
  const [cart, setCart] = useState(null)

  async function load() {
    const res = await axios.get(`${API_BASE}/api/cart`, { headers: { Authorization: `Bearer ${token}` } })
    setCart(res.data)
  }

  useEffect(() => { load() }, [])

  function total() {
    if (!cart) return 0
    return cart.items.reduce((sum, ci) => sum + (ci.unitPrice * ci.quantity), 0)
  }

  async function update(ci, qty) {
    await axios.put(`${API_BASE}/api/cart/item/${ci.id}`, { quantity: qty },
      { headers: { Authorization: `Bearer ${token}` } })
    await load()
  }

  async function remove(ci) {
    await axios.delete(`${API_BASE}/api/cart/item/${ci.id}`,
      { headers: { Authorization: `Bearer ${token}` } })
    await load()
  }

  if (!cart) return <div>Loading...</div>

  return (
    <div className="card">
      <h2>Your Cart</h2>
      {cart.items.length === 0 && <p>No items yet.</p>}
      {cart.items.map(ci => (
        <div key={ci.id} className="cart-row">
          <div className="grow">
            <strong>{ci.item.name}</strong>
            <div className="muted">{ci.item.category}</div>
          </div>
          <div>₹{ci.unitPrice}</div>
          <div className="qty">
            <button onClick={()=>update(ci, Math.max(1, ci.quantity-1))}>-</button>
            <span>{ci.quantity}</span>
            <button onClick={()=>update(ci, ci.quantity+1)}>+</button>
          </div>
          <div>₹{ci.unitPrice * ci.quantity}</div>
          <button className="link" onClick={()=>remove(ci)}>Remove</button>
        </div>
      ))}
      <hr/>
      <div className="cart-total">Total: <strong>₹{total()}</strong></div>
    </div>
  )
}
