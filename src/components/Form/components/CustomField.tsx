// import { FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';
import { useController } from 'react-hook-form';
import { CustomFieldProps } from '../types';
import { ErrorMessage } from './ErrorMessage';

export function CustomField(props: CustomFieldProps & { name: string }) {
  const { name, Component } = props;
  const {
    field,
    fieldState: { error: fieldError },
    formState,
  } = useController({ name });

  const error = fieldError ? <ErrorMessage>{fieldError.message}</ErrorMessage> : undefined;

  return <Component field={field} formState={formState} error={error} />;
}
