import { FormEvent, useEffect, useState } from 'react'
import { Plan } from '../model/types'
import { createData, getData } from '../services/api'

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [form, setForm] = useState({ nome: '', descricao: '', preco: 0, duracaoMeses: 1 })

  async function loadPlans() {
    const data = await getData<Plan>('plans')
    setPlans(data)
  }

  useEffect(() => { loadPlans() }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await createData('plans', { ...form, id: Date.now() })
    setForm({ nome: '', descricao: '', preco: 0, duracaoMeses: 1 })
    loadPlans()
  }

  return (
    <div>
      <h2 className="mb-3">Planos</h2>
      <form className="card card-body mb-3" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-3"><input className="form-control" placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></div>
          <div className="col-md-4"><input className="form-control" placeholder="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} /></div>
          <div className="col-md-2"><input className="form-control" type="number" placeholder="Preço" value={form.preco} onChange={e => setForm({ ...form, preco: Number(e.target.value) })} /></div>
          <div className="col-md-1"><input className="form-control" type="number" placeholder="Meses" value={form.duracaoMeses} onChange={e => setForm({ ...form, duracaoMeses: Number(e.target.value) })} /></div>
          <div className="col-md-2"><button className="btn btn-primary w-100">Salvar</button></div>
        </div>
      </form>

      <div className="row g-3">
        {plans.map(plan => (
          <div className="col-md-4" key={plan.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{plan.nome}</h5>
                <p className="card-text">{plan.descricao}</p>
                <strong>R$ {plan.preco.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
