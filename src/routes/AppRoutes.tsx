import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Categories from '../pages/Categories'
import Courses from '../pages/Courses'
import Users from '../pages/Users'
import Enrollments from '../pages/Enrollments'
import Plans from '../pages/Plans'
import Checkout from '../pages/Checkout'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categorias" element={<Categories />} />
      <Route path="/cursos" element={<Courses />} />
      <Route path="/usuarios" element={<Users />} />
      <Route path="/matriculas" element={<Enrollments />} />
      <Route path="/planos" element={<Plans />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}
