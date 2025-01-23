import { useController } from 'react-hook-form';
import { MultiSelect as MantineMultiSelect } from '@mantine/core';
import { Controlled, MultiSelectProps } from '../types';
import { ErrorMessage } from './ErrorMessage';

function MultiSelect(props: Controlled<MultiSelectProps>) {
  const { label, name, options, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
    formState: { defaultValues },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  const { onChange, ...restField } = field;

  return (
    <MantineMultiSelect
      id={name}
      label={label}
      data={options}
      onChange={(value) => {
        onChange(value ?? defaultValues?.[value]);
      }}
      error={error}
      {...rest}
      {...restField}
    />
  );
}

export default MultiSelect;
