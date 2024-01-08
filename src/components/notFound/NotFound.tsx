import { FC, ReactElement } from 'react'
import Typography from '@mui/joy/Typography'
import Container from '../container/Container'

const NotFound: FC<{ element: string }> = ({ element }): ReactElement => {
  return (
    <Container>
      <Typography color='warning' level='h4'>
        No {element} found
      </Typography>
    </Container>
  )
}

export default NotFound
