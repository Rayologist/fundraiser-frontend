import { useController } from 'react-hook-form';
import { Checkbox as MantineCheckbox } from '@mantine/core';
import { CheckboxProps, Controlled } from '../types';
import { ErrorMessage } from './ErrorMessage';

function Checkbox(props: Controlled<CheckboxProps>) {
  const { label, name, ...rest } = props;
  const {
    field: { value, ...field },
    fieldState: { error: fieldError },
    formState: { defaultValues },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  const { onChange, ...restField } = field;

  return (
    <MantineCheckbox
      id={name}
      label={label}
      onChange={(value) => onChange(value ?? defaultValues?.[name])}
      checked={value}
      error={error}
      {...rest}
      {...restField}
    />
  );
}

export default Checkbox;
