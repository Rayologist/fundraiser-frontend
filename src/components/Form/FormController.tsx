import React from 'react';
import Checkbox from './components/Checkbox';
import CheckboxGroup from './components/CheckboxGroup';
import { CustomField } from './components/CustomField';
import DateInput from './components/DateInput';
import FileInput from './components/FileInput';
import MultiSelect from './components/MultiSelect';
import NumberInput from './components/NumberInput';
import PasswordInput from './components/PasswordInput';
import PinInput from './components/PinInput';
import RadioGroup from './components/RadioGroup';
import Select from './components/Select';
import SwitchGroup from './components/SwitchGroup';
import Textarea from './components/Textarea';
import TextInput from './components/TextInput';
import { ControllerProps } from './types';

export function FormController(props: ControllerProps) {
  const { control, ...others } = props;
  /**
   * `any` is used here because the `control` prop is used to determine the type of component to render.
   */
  const rest = others as any;

  switch (control) {
    case 'checkbox':
      return <Checkbox {...rest} />;
    case 'checkbox-group':
      return <CheckboxGroup {...rest} />;
    case 'date-input':
      return <DateInput {...rest} />;
    case 'file-input':
      return <FileInput {...rest} />;
    case 'multi-select':
      return <MultiSelect {...rest} />;
    case 'number-input':
      return <NumberInput {...rest} />;
    case 'password-input':
      return <PasswordInput {...rest} />;
    case 'pin-input':
      return <PinInput {...rest} />;
    case 'radio-group':
      return <RadioGroup {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'switch-group':
      return <SwitchGroup {...rest} />;
    case 'text-input':
      return <TextInput {...rest} />;
    case 'text-area':
      return <Textarea {...rest} />;
    case 'custom-field':
      return <CustomField {...rest} />;
    default:
      return null;
  }
}
