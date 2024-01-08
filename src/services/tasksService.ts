import axios from 'axios'
import { Task } from '../utils/types'

const baseUrl = 'http://localhost:3001'

export default class TasksService {
  getTasks = async (): Promise<Task[]> => {
    return (await axios.get(`${baseUrl}/tasks`)).data
  }

  completeTask = async (task: Task) => {
    await axios.get(`${baseUrl}/tasks/${task.id}`)
  }
}
