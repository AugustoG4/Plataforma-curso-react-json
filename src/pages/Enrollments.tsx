import { FormEvent, useEffect, useState } from 'react'
import { Course, Enrollment, User } from '../model/types'
import { createData, getData } from '../services/api'

export default function Enrollments() {
  const [users, setUsers] = useState<User[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [form, setForm] = useState({ idUsuario: 1, idCurso: 1 })

  async function loadAll() {
    const [userData, courseData, enrollmentData] = await Promise.all([
      getData<User>('users'),
      getData<Course>('courses'),
      getData<Enrollment>('enrollments'),
    ])
    setUsers(userData)
    setCourses(courseData)
    setEnrollments(enrollmentData)
  }

  useEffect(() => { loadAll() }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    await createData('enrollments', {
      id: Date.now(),
      idUsuario: form.idUsuario,
      idCurso: form.idCurso,
      dataMatricula: new Date().toISOString().slice(0, 10),
      dataConclusao: null,
    })
    loadAll()
  }

  return (
    <div>
      <h2 className="mb-3">Matrículas</h2>
      <form className="card card-body mb-3" onSubmit={handleSubmit}>
        <div className="row g-2">
          <div className="col-md-5">
            <select className="form-select" value={form.idUsuario} onChange={e => setForm({ ...form, idUsuario: Number(e.target.value) })}>
              {users.map(user => <option key={user.id} value={user.id}>{user.nomeCompleto}</option>)}
            </select>
          </div>
          <div className="col-md-5">
            <select className="form-select" value={form.idCurso} onChange={e => setForm({ ...form, idCurso: Number(e.target.value) })}>
              {courses.map(course => <option key={course.id} value={course.id}>{course.titulo}</option>)}
            </select>
          </div>
          <div className="col-md-2"><button className="btn btn-primary w-100">Matricular</button></div>
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead><tr><th>Usuário</th><th>Curso</th><th>Data</th><th>Conclusão</th></tr></thead>
          <tbody>
            {enrollments.map(enrollment => {
              const user = users.find(u => u.id === enrollment.idUsuario)
              const course = courses.find(c => c.id === enrollment.idCurso)
              return (
                <tr key={enrollment.id}>
                  <td>{user?.nomeCompleto}</td>
                  <td>{course?.titulo}</td>
                  <td>{enrollment.dataMatricula}</td>
                  <td>{enrollment.dataConclusao ?? 'Em andamento'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
