import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext.jsx'

export default function Items() {
  const { API_BASE, token } = useAuth()
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  async function load() {
    const params = { q, category, minPrice, maxPrice, page, size: 12 }
    Object.keys(params).forEach(k => (params[k] === '' || params[k] === undefined) && delete params[k])
    const res = await axios.get(`${API_BASE}/api/items`, { params })
    setItems(res.data.content)
    setTotalPages(res.data.totalPages)
  }

  useEffect(() => { load() }, [page])

  return (
    <div>
      <div className="filters card">
        <input placeholder="Search name..." value={q} onChange={e=>setQ(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <input placeholder="Min Price" value={minPrice} onChange={e=>setMinPrice(e.target.value)} type="number" />
        <input placeholder="Max Price" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} type="number" />
        <button onClick={() => { setPage(0); load() }} className="btn">Apply</button>
      </div>
      <div className="grid">
        {items.map(it => (
          <div key={it.id} className="card product">
            <img src={it.imageUrl} alt={it.name} />
            <h3>{it.name}</h3>
            <p className="price">₹{it.price}</p>
            <p className="muted">{it.category}</p>
            <button
              disabled={!token}
              onClick={async () => {
                await axios.post(`${API_BASE}/api/cart/add`, { itemId: it.id, quantity: 1 },
                  { headers: { Authorization: `Bearer ${token}` } })
                alert('Added to cart')
              }}
              className="btn"
            >
              {token ? 'Add to cart' : 'Login to add'}
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button disabled={page===0} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span>Page {page+1} / {totalPages}</span>
        <button disabled={page+1>=totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}
