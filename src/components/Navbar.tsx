import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link ${isActive ? 'active fw-bold' : ''}`

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">Plataforma de Cursos</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <div className="navbar-nav ms-auto">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/categorias" className={linkClass}>Categorias</NavLink>
            <NavLink to="/cursos" className={linkClass}>Cursos</NavLink>
            <NavLink to="/usuarios" className={linkClass}>Usuários</NavLink>
            <NavLink to="/matriculas" className={linkClass}>Matrículas</NavLink>
            <NavLink to="/planos" className={linkClass}>Planos</NavLink>
            <NavLink to="/checkout" className={linkClass}>Checkout</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
