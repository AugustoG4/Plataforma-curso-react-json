export type Category = {
  id: number
  nome: string
  descricao: string
}

export type User = {
  id: number
  nomeCompleto: string
  email: string
  senhaHash: string
  dataCadastro: string
}

export type Course = {
  id: number
  titulo: string
  descricao: string
  idInstrutor: number
  idCategoria: number
  nivel: string
  dataPublicacao: string
  totalAulas: number
  totalHoras: number
}

export type Module = {
  id: number
  idCurso: number
  titulo: string
  ordem: number
}

export type Lesson = {
  id: number
  idModulo: number
  titulo: string
  tipoConteudo: string
  urlConteudo: string
  duracaoMinutos: number
  ordem: number
}

export type Enrollment = {
  id: number
  idUsuario: number
  idCurso: number
  dataMatricula: string
  dataConclusao: string | null
}

export type Plan = {
  id: number
  nome: string
  descricao: string
  preco: number
  duracaoMeses: number
}

export type Subscription = {
  id: number
  idUsuario: number
  idPlano: number
  dataInicio: string
  dataFim: string
}

export type Payment = {
  id: number
  idAssinatura: number
  valorPago: number
  dataPagamento: string
  metodoPagamento: string
  idTransacaoGateway: string
}
