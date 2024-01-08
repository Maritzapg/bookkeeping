import { FC, ReactElement, useCallback, useEffect, useState } from 'react'
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

const generateRandom = (min: number, max: number, except?: number): number => {
  let num = Math.floor(Math.random() * max)
  while (num === except) {
    num = generateRandom(min, max)
  }
  return num
}

const Bookkeeping: FC = (): ReactElement => {
  const [botName, setBotName] = useState<string>('')
  const [bot, setBot] = useState<Bot>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    const newTasksList = tasks.filter(t => t.id !== task.id)

    await new TasksService().completeTask(task)

    setTasks(newTasksList)
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
        <Input setValue={value => setBotName(value)} />
        {isLoading && <LinearProgress />}
        {!isLoading && tasks.length > 0 && <Tasks tasks={tasks} />}
        {tasks.length === 0 && (
          <Typography color='warning' level='h4'>
            You have completed all the tasks!
          </Typography>
        )}
        <Bots newBot={bot} />
      </Box>
    </Container>
  )
}

export default Bookkeeping
