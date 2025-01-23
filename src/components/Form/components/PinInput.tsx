import { useController } from 'react-hook-form';
import { InputWrapper, PinInput as MantinePinInput } from '@mantine/core';
import { Controlled, PinInputProps } from '../types';
import { ErrorMessage } from './ErrorMessage';

function PinInput(props: Controlled<PinInputProps>) {
  const {
    label,
    name,
    description,
    descriptionProps,
    required,
    withAsterisk,
    labelProps,
    errorProps,
    inputContainer,
    inputWrapperOrder,
    ...rest
  } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  const errorMessage = fieldError ? (
    <ErrorMessage>{fieldError.message?.toString()}</ErrorMessage>
  ) : undefined;

  return (
    <InputWrapper
      id={name}
      label={label}
      error={errorMessage}
      {...{
        description,
        descriptionProps,
        required,
        withAsterisk,
        labelProps,
        errorProps,
        inputContainer,
        inputWrapperOrder,
      }}
    >
      <MantinePinInput id={name} error={!!errorMessage} {...rest} {...field} />
    </InputWrapper>
  );
}

export default PinInput;
