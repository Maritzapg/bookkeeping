import { FC, ReactElement, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

type Props = {
  setValue: (value: string) => void
  isDisabled: boolean
}

const Input: FC<Props> = ({ setValue, isDisabled }): ReactElement => {
  const [inputValue, setInputValue] = useState<string>('')

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setValue(inputValue)
    setInputValue('')
  }

  return (
    <Grid container width={'100%'}>
      <Grid item width={'85%'}>
        <TextField
          label='Type a name'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          variant='outlined'
          fullWidth
          style={{ backgroundColor: '#ffffff' }}
        />
      </Grid>

      <Grid item alignItems='stretch' style={{ display: 'flex' }} width={'15%'}>
        <Button
          color='primary'
          variant='contained'
          fullWidth
          disabled={inputValue === '' || isDisabled}
          onClick={e => onSubmit(e)}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  )
}

export default Input
