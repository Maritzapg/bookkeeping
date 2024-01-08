import { FC, ReactElement } from 'react'
import Typography from '@mui/joy/Typography'

const TitleGrid: FC<{ title: string }> = ({ title }): ReactElement => {
  return (
    <>
      <div style={{ height: '30px' }} />
      <Typography color='neutral' level='title-lg'>
        {title}
      </Typography>
      <div style={{ height: '10px' }} />
    </>
  )
}

export default TitleGrid
