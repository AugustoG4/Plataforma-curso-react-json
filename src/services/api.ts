const API_URL = 'http://localhost:3001'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    throw new Error('Erro ao acessar a API')
  }

  return response.json()
}

export function getData<T>(resource: string) {
  return request<T[]>(`/${resource}`)
}

export function createData<T>(resource: string, item: T) {
  return request<T>(`/${resource}`, {
    method: 'POST',
    body: JSON.stringify(item),
  })
}
