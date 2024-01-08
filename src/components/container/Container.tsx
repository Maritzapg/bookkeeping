import { FC, ReactNode } from 'react'
import './Container.css'

type Props = { children: ReactNode }

const Container: FC<Props> = ({ children }) => {
  return <div className='container'>{children}</div>
}

export default Container
