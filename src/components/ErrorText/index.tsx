import { Typography } from '@material-ui/core'

interface ErrorTextProps {
  errorText: string
}

const ErrorText: React.FC<ErrorTextProps> = ({ errorText }) => {

  return (
    <Typography variant="body1" color="error">{errorText}</Typography>
  )
}

export default ErrorText