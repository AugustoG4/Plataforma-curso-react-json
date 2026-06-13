import { FormEvent, useEffect, useState } from 'react'
import { Category, Course, Lesson, Module } from '../model/types'
import { createData, getData } from '../services/api'

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    idInstrutor: 1,
    idCategoria: 1,
    nivel: 'Iniciante',
    totalAulas: 0,
    totalHoras: 0,
  })

  const [moduleForm, setModuleForm] = useState({ idCurso: 1, titulo: '', ordem: 1 })
  const [lessonForm, setLessonForm] = useState({ idModulo: 1, titulo: '', tipoConteudo: 'Texto', urlConteudo: '#', duracaoMinutos: 10, ordem: 1 })

  async function loadAll() {
    const [courseData, categoryData, moduleData, lessonData] = await Promise.all([
      getData<Course>('courses'),
      getData<Category>('categories'),
      getData<Module>('modules'),
      getData<Lesson>('lessons'),
    ])
    setCourses(courseData)
    setCategories(categoryData)
    setModules(moduleData)
    setLessons(lessonData)
  }

  useEffect(() => { loadAll() }, [])

  async function handleCourseSubmit(e: FormEvent) {
    e.preventDefault()
    await createData('courses', { ...form, id: Date.now(), dataPublicacao: new Date().toISOString().slice(0, 10) })
    setForm({ titulo: '', descricao: '', idInstrutor: 1, idCategoria: 1, nivel: 'Iniciante', totalAulas: 0, totalHoras: 0 })
    loadAll()
  }

  async function handleModuleSubmit(e: FormEvent) {
    e.preventDefault()
    await createData('modules', { ...moduleForm, id: Date.now() })
    setModuleForm({ idCurso: 1, titulo: '', ordem: 1 })
    loadAll()
  }

  async function handleLessonSubmit(e: FormEvent) {
    e.preventDefault()
    await createData('lessons', { ...lessonForm, id: Date.now() })
    setLessonForm({ idModulo: 1, titulo: '', tipoConteudo: 'Texto', urlConteudo: '#', duracaoMinutos: 10, ordem: 1 })
    loadAll()
  }

  return (
    <div className="row g-4">
      <div className="col-12">
        <h2>Cursos</h2>
        <form className="card card-body mb-3" onSubmit={handleCourseSubmit}>
          <div className="row g-2">
            <div className="col-md-3"><input className="form-control" placeholder="Título" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} /></div>
            <div className="col-md-3"><input className="form-control" placeholder="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} /></div>
            <div className="col-md-2">
              <select className="form-select" value={form.idCategoria} onChange={e => setForm({ ...form, idCategoria: Number(e.target.value) })}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div className="col-md-2"><input className="form-control" placeholder="Nível" value={form.nivel} onChange={e => setForm({ ...form, nivel: e.target.value })} /></div>
            <div className="col-md-2"><button className="btn btn-primary w-100">Salvar</button></div>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead><tr><th>Título</th><th>Categoria</th><th>Nível</th><th>Aulas</th></tr></thead>
            <tbody>
              {courses.map(course => {
                const category = categories.find(c => c.id === course.idCategoria)
                return (
                  <tr key={course.id}>
                    <td>{course.titulo}</td>
                    <td>{category?.nome ?? 'Sem categoria'}</td>
                    <td>{course.nivel}</td>
                    <td>{course.totalAulas}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-md-6">
        <h4>Módulos</h4>
        <form className="card card-body" onSubmit={handleModuleSubmit}>
          <select className="form-select mb-2" value={moduleForm.idCurso} onChange={e => setModuleForm({ ...moduleForm, idCurso: Number(e.target.value) })}>
            {courses.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
          </select>
          <input className="form-control mb-2" placeholder="Título do módulo" value={moduleForm.titulo} onChange={e => setModuleForm({ ...moduleForm, titulo: e.target.value })} />
          <input className="form-control mb-2" type="number" placeholder="Ordem" value={moduleForm.ordem} onChange={e => setModuleForm({ ...moduleForm, ordem: Number(e.target.value) })} />
          <button className="btn btn-success">Salvar módulo</button>
        </form>

        <ul className="list-group mt-3">
          {modules.map(module => {
            const course = courses.find(c => c.id === module.idCurso)
            return <li key={module.id} className="list-group-item">{module.titulo} — {course?.titulo}</li>
          })}
        </ul>
      </div>

      <div className="col-md-6">
        <h4>Aulas</h4>
        <form className="card card-body" onSubmit={handleLessonSubmit}>
          <select className="form-select mb-2" value={lessonForm.idModulo} onChange={e => setLessonForm({ ...lessonForm, idModulo: Number(e.target.value) })}>
            {modules.map(m => <option key={m.id} value={m.id}>{m.titulo}</option>)}
          </select>
          <input className="form-control mb-2" placeholder="Título da aula" value={lessonForm.titulo} onChange={e => setLessonForm({ ...lessonForm, titulo: e.target.value })} />
          <input className="form-control mb-2" placeholder="Tipo de conteúdo" value={lessonForm.tipoConteudo} onChange={e => setLessonForm({ ...lessonForm, tipoConteudo: e.target.value })} />
          <input className="form-control mb-2" placeholder="URL do conteúdo" value={lessonForm.urlConteudo} onChange={e => setLessonForm({ ...lessonForm, urlConteudo: e.target.value })} />
          <input className="form-control mb-2" type="number" placeholder="Duração" value={lessonForm.duracaoMinutos} onChange={e => setLessonForm({ ...lessonForm, duracaoMinutos: Number(e.target.value) })} />
          <input className="form-control mb-2" type="number" placeholder="Ordem" value={lessonForm.ordem} onChange={e => setLessonForm({ ...lessonForm, ordem: Number(e.target.value) })} />
          <button className="btn btn-success">Salvar aula</button>
        </form>

        <ul className="list-group mt-3">
          {lessons.map(lesson => {
            const module = modules.find(m => m.id === lesson.idModulo)
            return <li key={lesson.id} className="list-group-item">{lesson.titulo} — {module?.titulo}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
