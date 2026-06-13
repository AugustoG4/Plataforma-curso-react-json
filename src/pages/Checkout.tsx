import { FormEvent, useEffect, useState } from 'react'
import { Plan, Payment, Subscription, User } from '../model/types'
import { createData, getData } from '../services/api'

export default function Checkout() {
  const [users, setUsers] = useState<User[]>([])
  const [plans, setPlans] = useState<Plan[]>([])
  const [payment, setPayment] = useState<Payment | null>(null)
  const [form, setForm] = useState({
    idUsuario: 1,
    idPlano: 1,
    metodoPagamento: 'PIX',
  })

  async function loadAll() {
    const [userData, planData] = await Promise.all([
      getData<User>('users'),
      getData<Plan>('plans'),
    ])
    setUsers(userData)
    setPlans(planData)
  }

  useEffect(() => { loadAll() }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const plan = plans.find(p => p.id === form.idPlano)
    if (!plan) return

    const subscription: Subscription = {
      id: Date.now(),
      idUsuario: form.idUsuario,
      idPlano: form.idPlano,
      dataInicio: new Date().toISOString().slice(0, 10),
      dataFim: new Date(Date.now() + plan.duracaoMeses * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    }

    await createData('subscriptions', subscription)

    const paymentCreated: Payment = {
      id: Date.now() + 1,
      idAssinatura: subscription.id,
      valorPago: plan.preco,
      dataPagamento: new Date().toISOString().slice(0, 10),
      metodoPagamento: form.metodoPagamento,
      idTransacaoGateway: `TXN-${Date.now()}`,
    }

    await createData('payments', paymentCreated)
    setPayment(paymentCreated)
  }

  return (
    <div>
      <h2 className="mb-3">Checkout</h2>
      <form className="card card-body mb-3" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-4">
            <select className="form-select" value={form.idUsuario} onChange={e => setForm({ ...form, idUsuario: Number(e.target.value) })}>
              {users.map(user => <option key={user.id} value={user.id}>{user.nomeCompleto}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select" value={form.idPlano} onChange={e => setForm({ ...form, idPlano: Number(e.target.value) })}>
              {plans.map(plan => <option key={plan.id} value={plan.id}>{plan.nome} - R$ {plan.preco.toFixed(2)}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <select className="form-select" value={form.metodoPagamento} onChange={e => setForm({ ...form, metodoPagamento: e.target.value })}>
              <option>PIX</option>
              <option>Cartão</option>
              <option>Boleto</option>
            </select>
          </div>
          <div className="col-md-2"><button className="btn btn-success w-100">Pagar</button></div>
        </div>
      </form>

      {payment && (
        <div className="alert alert-success">
          Pagamento criado com sucesso! ID da transação: {payment.idTransacaoGateway}
        </div>
      )}
    </div>
  )
}
