import { useController } from 'react-hook-form';
import {
  Group,
  Checkbox as MantineCheckbox,
  CheckboxGroup as MantineCheckboxGroup,
  Stack,
} from '@mantine/core';
import { CheckboxGroupProps, Controlled, Orientation } from '../types';
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

function CheckboxGroup(props: Controlled<CheckboxGroupProps>) {
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
    <MantineCheckboxGroup
      id={name}
      label={label}
      onChange={(value) => onChange(value ?? defaultValues?.[name])}
      error={error}
      {...rest}
      {...restField}
    >
      <OrientedContainer
        orientation={{ orientation: orientation, orientationProps } as Orientation}
        options={options.map((option, index) => {
          const { label, value, ...rest } = option;
          return (
            <MantineCheckbox key={`${label}-${index}`} label={label} value={value} {...rest} />
          );
        })}
      />
    </MantineCheckboxGroup>
  );
}

export default CheckboxGroup;
