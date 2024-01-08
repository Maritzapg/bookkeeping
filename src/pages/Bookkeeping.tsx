import { FC, ReactElement, forwardRef, useCallback, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Tasks from '../components/tasks/Tasks'
import Bots from '../components/bots/Bots'
import Input from '../components/form/Input'
import TasksService from '../services/tasksService'
import { Bot, Task } from '../utils/types'
import Typography from '@mui/joy/Typography'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const generateRandom = (min: number, max: number, except?: number): number => {
  let num = Math.floor(Math.random() * max)
  while (num === except) {
    num = generateRandom(min, max)
  }
  return num
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Bookkeeping: FC = (): ReactElement => {
  const [botName, setBotName] = useState<string>('')
  const [bot, setBot] = useState<Bot>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCompletingTask, setIsCompletingTask] = useState<boolean>(false)

  const getTasks = useCallback(async () => {
    setIsLoading(true)
    try {
      const tasksList = await new TasksService().getTasks()
      setTasks(tasksList)
    } catch (err) {
      //set an error
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getTasks()
  }, [])

  const completeTask = async (task: Task) => {
    setIsCompletingTask(true)

    await new TasksService().completeTask(task)
    setTasks(oldTasks => oldTasks.filter(t => t.id !== task.id))

    setIsCompletingTask(false)
  }

  useEffect(() => {
    if (botName !== '' && tasks.length > 0) {
      const unique_id = uuid()
      const indexTask1 = generateRandom(0, tasks.length)
      const indexTask2 = generateRandom(0, tasks.length, indexTask1)

      const selectedTasks = tasks.filter((_task, i) => i === indexTask1 || i === indexTask2)

      completeTask(selectedTasks[0])
      completeTask(selectedTasks[1])

      const newBot: Bot = {
        id: unique_id,
        name: botName,
        associatedTasks: `${selectedTasks[0].description} - ${selectedTasks[1].description}`,
      }

      setBot(newBot)
      setBotName('')
    }
  }, [botName])

  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#ebf5ee', height: 'auto', padding: '40px' }}>
        <Input setValue={value => setBotName(value)} isDisabled={isCompletingTask} />
        {isLoading && <LinearProgress />}
        {!isLoading && tasks.length > 0 && <Tasks tasks={tasks} />}
        {tasks.length === 0 && (
          <>
            <div style={{ height: '30px' }} />
            <Typography color='warning' level='h4'>
              No tasks found
            </Typography>
            <div style={{ height: '10px' }} />
          </>
        )}
        <Bots newBot={bot} />
      </Box>
      {isCompletingTask && <Alert severity='info'>Completing tasks...</Alert>}
    </Container>
  )
}

export default Bookkeeping
