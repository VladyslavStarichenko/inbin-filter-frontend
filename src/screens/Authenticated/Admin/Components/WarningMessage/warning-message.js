// Modules
import { memo } from 'react';
import { Alert, AlertTitle } from '@mui/material';

function ErrorMessage(props) {
  const { firstPart, secondPart } = props;

  return (
    <Alert severity="warning">
    <AlertTitle>Warning</AlertTitle>
      {firstPart}<strong>{secondPart}</strong>
    </Alert>
  );
}

export default memo(ErrorMessage);
