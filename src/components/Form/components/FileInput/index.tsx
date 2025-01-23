import { IconUpload } from '@tabler/icons-react';
import { useController } from 'react-hook-form';
import { FileInput as MantineFileInput } from '@mantine/core';
import { Controlled, FileInputProps } from '../../types';
import { ErrorMessage } from '../ErrorMessage';
import ValueComponent from './ValueComponent';

function FileInput(props: Controlled<FileInputProps<boolean>>) {
  const { label, name, ...rest } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  const error = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  return (
    <MantineFileInput
      label={label}
      leftSection={<IconUpload size={14} />}
      valueComponent={ValueComponent}
      error={error}
      {...rest}
      {...field}
    />
  );
}

export default FileInput;
