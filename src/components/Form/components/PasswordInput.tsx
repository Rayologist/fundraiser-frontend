import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useController } from 'react-hook-form';
import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import { Controlled, PasswordInputProps } from '../types';
import { ErrorMessage } from './ErrorMessage';

function PasswordInput(props: Controlled<PasswordInputProps>) {
  const { label, name, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  return (
    <MantinePasswordInput
      id={name}
      label={label}
      error={error}
      visibilityToggleIcon={({ reveal }) =>
        reveal ? (
          <IconEyeOff style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
        ) : (
          <IconEye style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
        )
      }
      {...rest}
      {...field}
    />
  );
}

export default PasswordInput;
