import { FormEvent, useEffect, useState } from 'react'
import { Category } from '../model/types'
import { createData, getData } from '../services/api'

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState({ nome: '', descricao: '' })

  async function loadCategories() {
    const data = await getData<Category>('categories')
    setCategories(data)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Category = {
      id: Date.now(),
      nome: form.nome,
      descricao: form.descricao,
    }
    await createData('categories', next)
    setForm({ nome: '', descricao: '' })
    loadCategories()
  }

  return (
    <div>
      <h2 className="mb-3">Categorias</h2>

      <form className="card card-body mb-4" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <input className="form-control" placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
          </div>
          <div className="col-md-6">
            <input className="form-control" placeholder="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100">Salvar</button>
          </div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.nome}</td>
                <td>{category.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
