export interface Task {
  id: number
  description: string
  duration: number
}

export interface Bot {
  id?: string
  name: string
  associatedTasks?: string
}
