import { ReactNode } from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form';
import {
  GridColProps,
  GroupProps,
  InputWrapperProps,
  CheckboxGroupProps as MantineCheckboxGroupProps,
  CheckboxProps as MantineCheckboxProps,
  FileInputProps as MantineFileInputProps,
  MultiSelectProps as MantineMultiSelectProps,
  NumberInputProps as MantineNumberInputProps,
  PasswordInputProps as MantinePasswordInputProps,
  PinInputProps as MantinePinInputProps,
  RadioGroupProps as MantineRadioGroupProps,
  SelectProps as MantineSelectProps,
  SwitchGroupProps as MantineSwitchGroupProps,
  TextareaProps as MantineTextareaProps,
  TextInputProps as MantineTextInputProps,
  RadioProps,
  StackProps,
  SwitchProps,
} from '@mantine/core';
import { DateInputProps as MantineDateInputProps } from '@mantine/dates';

export type Option<OtherProps = {}> = {
  label: ReactNode;
  value: any;
} & OtherProps;

export interface Options<OtherProps = {}> {
  options: Option<OtherProps>[];
}

export type Controlled<T> = { label: ReactNode; name: string } & T;
export type Orientation =
  | { orientation?: 'horizontal'; orientationProps?: GroupProps }
  | { orientation?: 'vertical'; orientationProps?: StackProps };
export type TextInputProps = MantineTextInputProps;
export type PasswordInputProps = MantinePasswordInputProps;
export type TextareaProps = MantineTextareaProps;
export type NumberInputProps = MantineNumberInputProps;
export type DateInputProps = MantineDateInputProps;
export type PinInputProps = MantinePinInputProps & InputWrapperProps;
export type FileInputProps<T extends boolean> = MantineFileInputProps<T>;
export type SelectProps = Omit<MantineSelectProps, 'data'> & {
  options: MantineSelectProps['data'];
};
export type MultiSelectProps = Omit<MantineMultiSelectProps, 'data'> & {
  options: MantineMultiSelectProps['data'];
};
export type CheckboxGroupProps = Omit<MantineCheckboxGroupProps, 'children'> &
  Options<MantineCheckboxProps> &
  Orientation;
export type CheckboxProps = Omit<MantineCheckboxProps, 'children' | 'name'>;
export type RadioGroupProps = Omit<MantineRadioGroupProps, 'children' | 'name'> &
  Options<RadioProps> &
  Orientation;
export type SwitchGroupProps = Omit<MantineSwitchGroupProps, 'children'> &
  Options<SwitchProps> &
  Orientation;

export type CustomFieldProps = {
  Component: (props: {
    field: ControllerRenderProps<FieldValues, string>;
    formState: UseFormStateReturn<FieldValues>;
    error: ReactNode | null;
  }) => React.ReactNode;
};

export type Controller =
  | ({ control: 'checkbox' } & CheckboxProps)
  | ({ control: 'checkbox-group' } & CheckboxGroupProps)
  | ({ control: 'date-input' } & DateInputProps)
  | ({ control: 'file-input' } & FileInputProps<boolean>)
  | ({ control: 'multi-select' } & MultiSelectProps)
  | ({ control: 'number-input' } & NumberInputProps)
  | ({ control: 'password-input' } & PasswordInputProps)
  | ({ control: 'pin-input' } & PinInputProps)
  | ({ control: 'radio-group' } & RadioGroupProps)
  | ({ control: 'select' } & SelectProps)
  | ({ control: 'switch-group' } & SwitchGroupProps)
  | ({ control: 'text-area' } & TextareaProps)
  | ({ control: 'text-input' } & TextInputProps);

export type ControllerProps = Controller | ({ control: 'custom-field' } & CustomFieldProps);

export type ControllerMap<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  [Key in keyof TFieldValues]-?: ControllerProps & { name?: Key } & {
    col?: GridColProps;
    Field?: (props: {
      ctx: UseFormReturn<TFieldValues, TContext>;
      fieldComponent: ReactNode;
    }) => ReactNode;
  };
};

export type ControllerMapResolver<TFieldValues extends FieldValues = FieldValues, TContext = any> =
  | ControllerMap<TFieldValues, TContext>
  | ((context: UseFormReturn<TFieldValues, TContext>) => ControllerMap<TFieldValues, TContext>);

export type FormControllerProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  controllers: ControllerMapResolver<TFieldValues, TContext>;
};
