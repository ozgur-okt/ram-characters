import { Typography } from '@material-ui/core'

function ErrorText({ errorText} : { errorText: string}) {

  return (
    <Typography variant="body1" color="error">{errorText}</Typography>
  )
}

export default ErrorText