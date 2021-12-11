// Modules
import { Alert, AlertTitle } from '@mui/material';

function ErrorMessage() {
  return (
    <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
      Something went wrong <strong>please try again later!</strong>
    </Alert>
  );
}

export default ErrorMessage;
