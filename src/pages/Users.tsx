import { FormEvent, useEffect, useState } from 'react'
import { User } from '../model/types'
import { createData, getData } from '../services/api'

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [form, setForm] = useState({ nomeCompleto: '', email: '', senhaHash: '' })

  async function loadUsers() {
    const data = await getData<User>('users')
    setUsers(data)
  }

  useEffect(() => { loadUsers() }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await createData('users', {
      id: Date.now(),
      nomeCompleto: form.nomeCompleto,
      email: form.email,
      senhaHash: form.senhaHash,
      dataCadastro: new Date().toISOString().slice(0, 10),
    })
    setForm({ nomeCompleto: '', email: '', senhaHash: '' })
    loadUsers()
  }

  return (
    <div>
      <h2 className="mb-3">Usuários</h2>
      <form className="card card-body mb-3" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-4"><input className="form-control" placeholder="Nome completo" value={form.nomeCompleto} onChange={e => setForm({ ...form, nomeCompleto: e.target.value })} /></div>
          <div className="col-md-4"><input className="form-control" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
          <div className="col-md-2"><input className="form-control" placeholder="Senha" value={form.senhaHash} onChange={e => setForm({ ...form, senhaHash: e.target.value })} /></div>
          <div className="col-md-2"><button className="btn btn-primary w-100">Salvar</button></div>
        </div>
      </form>

      <ul className="list-group">
        {users.map(user => <li key={user.id} className="list-group-item">{user.nomeCompleto} — {user.email}</li>)}
      </ul>
    </div>
  )
}
