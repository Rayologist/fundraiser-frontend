import { useController } from 'react-hook-form';
import { Group, RadioGroup as MantineRadioGroup, Radio, Stack } from '@mantine/core';
import { Controlled, Orientation, RadioGroupProps } from '../types';
import { ErrorMessage } from './ErrorMessage';

function OrientedContainer(props: { orientation: Orientation; options: React.ReactNode[] }) {
  const { orientation } = props;

  if (orientation.orientation === 'horizontal') {
    return (
      <Group mt="xs" {...orientation.orientationProps}>
        {props.options}
      </Group>
    );
  }

  if (orientation.orientation === 'vertical') {
    return (
      <Stack mt="xs" {...orientation.orientationProps}>
        {props.options}
      </Stack>
    );
  }

  return null;
}

function RadioGroup(props: Controlled<RadioGroupProps>) {
  const { label, name, options, orientation = 'horizontal', orientationProps, ...rest } = props;
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
    <MantineRadioGroup
      id={name}
      label={label}
      error={error}
      onChange={(value) => {
        onChange(value ?? defaultValues?.[name]);
      }}
      {...rest}
      {...restField}
    >
      <OrientedContainer
        orientation={{ orientation, orientationProps } as Orientation}
        options={options.map((option, index) => {
          const { label, value, ...rest } = option;
          return <Radio key={`${label}-${index}`} value={value} label={label} {...rest} />;
        })}
      />
    </MantineRadioGroup>
  );
}

export default RadioGroup;
