import { FC } from 'react'
import Typography from '@mui/joy/Typography'
import Container from '../container/Container'

const Title: FC<{ title: string }> = ({ title }) => {
  return (
    <Container>
      <Typography color='primary' level='h2' variant='soft'>
        {title}
      </Typography>
    </Container>
  )
}

export default Title
