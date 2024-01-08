import { FC, ReactElement, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import TableGrid from '../grid/Grid'
import TitleGrid from '../grid/TitleGrid'
import { Bot } from '../../utils/types'
import { GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/joy/Typography'

type Props = { newBot: Bot | undefined }

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 450,
  },
  {
    field: 'associatedTasks',
    headerName: 'Associated Tasks',
    width: 400,
  },
]

const Bots: FC<Props> = ({ newBot }): ReactElement => {
  const [bots, setBots] = useState<Bot[]>([])

  useEffect(() => {
    if (newBot !== undefined) {
      const newList = [...bots, newBot]
      setBots(newList)
    }
  }, [newBot])

  return (
    <>
      <TitleGrid title={'Bots'} />
      {bots.length > 0 ? (
        <Box sx={{ height: 'auto', width: '100%' }}>
          <TableGrid rows={bots} columns={columns} />
        </Box>
      ) : (
        <Typography color='warning' level='h4'>
          No bots found, create one to start completing tasks
        </Typography>
      )}
    </>
  )
}

export default Bots
