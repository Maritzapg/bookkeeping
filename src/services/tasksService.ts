import axios from 'axios'
import { Task } from '../utils/types'

export default class TasksService {
  getTasks = async (): Promise<Task[]> => {
    return (await axios.get('http://localhost:3001/tasks')).data
  }

  completeTask = async (task: Task) => {
    // await axios.get(`http://localhost:3001/tasks/processInvoice`)
    await axios.get(`http://localhost:3001/tasks/${task.id}`)
  }
}
