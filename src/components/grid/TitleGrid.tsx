import { FC, ReactElement } from 'react'
import Typography from '@mui/joy/Typography'
import Container from '../container/Container'

const TitleGrid: FC<{ title: string }> = ({ title }): ReactElement => {
  return (
    <Container>
      <Typography color='neutral' level='title-lg'>
        {title}
      </Typography>
    </Container>
  )
}

export default TitleGrid
