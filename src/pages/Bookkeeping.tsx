import { FC, ReactElement, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Tasks from '../components/tasks/Tasks'
import Bots from '../components/bots/Bots'
import Input from '../components/form/Input'
import Title from '../components/title/Title'
import NotFound from '../components/notFound/NotFound'
import { generateRandom } from '../utils/functionUtils'
import { Bot, Task } from '../utils/types'
import TasksService from '../services/tasksService'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Bookkeeping: FC = (): ReactElement => {
  const [botName, setBotName] = useState<string>('')
  const [bot, setBot] = useState<Bot>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tasksCompleted, setTasksCompleted] = useState<boolean>(false)
  const allTasksSelected = useRef<Task[]>([])

  const getTasks = useCallback(async () => {
    setIsLoading(true)
    const tasksList = await new TasksService().getTasks()
    setTasks(tasksList)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getTasks()
  }, [])

  const completeTask = async (task: Task) => {
    await new TasksService().completeTask(task)
    setTasks(oldTasks => oldTasks.filter(t => t.id !== task.id))
  }

  useEffect(() => {
    if (botName !== '' && tasks.length > 0) {
      const unique_id = uuid()
      const availableTasks = tasks.filter(x => !allTasksSelected.current.includes(x))
      if (!availableTasks.length) {
        setTasksCompleted(true)
        return
      }
      const indexTask1 = generateRandom(0, availableTasks.length)
      const indexTask2 = generateRandom(0, availableTasks.length, indexTask1)
      const currentDescriptions: string[] = []

      const selectedTasks = availableTasks.filter((_task, i) => i === indexTask1 || i === indexTask2)

      selectedTasks.forEach(t => {
        allTasksSelected.current.push(t)
        currentDescriptions.push(t.description)
        completeTask(t)
      })

      const newBot: Bot = {
        id: unique_id,
        name: botName,
        associatedTasks: currentDescriptions.join(' - '),
      }

      setBot(newBot)
      setBotName('')
    }
  }, [botName])

  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#ebf5ee', height: 'auto', padding: '40px' }}>
        <Title title={'BOOKKEEPING'} />
        <Input setValue={value => setBotName(value)} isDisabled={tasksCompleted} />
        {isLoading && <LinearProgress />}
        {!isLoading && tasks.length > 0 && <Tasks tasks={tasks} />}
        {tasks.length === 0 && <NotFound element={'tasks'} />}
        <Bots newBot={bot} />
      </Box>
      {tasksCompleted && <Alert severity='info'>All tasks have been queued</Alert>}
    </Container>
  )
}

export default Bookkeeping
