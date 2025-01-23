import { useController } from 'react-hook-form';
import { TextInput as MantineTextInput } from '@mantine/core';
import { Controlled, TextInputProps } from '../types';
import { ErrorMessage } from './ErrorMessage';

function TextInput(props: Controlled<TextInputProps>) {
  const { label, name, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  return <MantineTextInput id={name} label={label} error={error} {...rest} {...field} />;
}

export default TextInput;
