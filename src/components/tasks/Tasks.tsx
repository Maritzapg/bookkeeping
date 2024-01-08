import { FC, ReactElement } from 'react'
import Box from '@mui/material/Box'
import { GridColDef } from '@mui/x-data-grid'
import TableGrid from '../grid/Grid'
import TitleGrid from '../grid/TitleGrid'
import { Task } from '../../utils/types'

type Props = { tasks: Task[] }

const columns: GridColDef[] = [
  {
    field: 'description',
    headerName: 'Description',
    width: 500,
  },
  {
    field: 'duration',
    headerName: 'Duration (ms)',
    width: 150,
  },
]

const Tasks: FC<Props> = ({ tasks }): ReactElement => {
  return (
    <>
      <TitleGrid title={'Tasks'} />
      <Box sx={{ height: 'auto', width: '100%' }}>
        <TableGrid rows={tasks} columns={columns} />
      </Box>
    </>
  )
}

export default Tasks
