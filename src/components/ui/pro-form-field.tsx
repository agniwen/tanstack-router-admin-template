import {
  ProFormCascader as AntdProFormCascader,
  ProFormCheckbox as AntdProFormCheckbox,
  ProFormColorPicker as AntdProFormColorPicker,
  ProFormDatePicker as AntdProFormDatePicker,
  ProFormDateRangePicker as AntdProFormDateRangePicker,
  ProFormDateTimePicker as AntdProFormDateTimePicker,
  ProFormDependency as AntdProFormDependency,
  ProFormDigit as AntdProFormDigit,
  ProFormFieldSet as AntdProFormFieldSet,
  ProFormList as AntdProFormList,
  ProFormMoney as AntdProFormMoney,
  ProFormRadio as AntdProFormRadio,
  ProFormRate as AntdProFormRate,
  ProFormSegmented as AntdProFormSegmented,
  ProFormSelect as AntdProFormSelect,
  ProFormSlider as AntdProFormSlider,
  ProFormSwitch as AntdProFormSwitch,
  ProFormText as AntdProFormText,
  ProFormTextArea as AntdProFormTextArea,
  ProFormTimePicker as AntdProFormTimePicker,
  ProFormTreeSelect as AntdProFormTreeSelect,
  ProFormUploadButton as AntdProFormUploadButton,
  ProFormUploadDragger as AntdProFormUploadDragger,
} from '@ant-design/pro-components';

// ProFormText
export interface ProFormTextProps extends React.ComponentProps<typeof AntdProFormText> {}
function FormText(props: ProFormTextProps) {
  return <AntdProFormText {...props} />;
}

// ProFormText.Password
export interface ProFormTextPasswordProps extends React.ComponentProps<typeof AntdProFormText.Password> {}
function FormTextPassword(props: ProFormTextPasswordProps) {
  return <AntdProFormText.Password {...props} />;
}

export const ProFormText = Object.assign(FormText, {
  Password: FormTextPassword,
});

// ProFormDigit
export interface ProFormDigitProps extends React.ComponentProps<typeof AntdProFormDigit> {}
export function ProFormDigit(props: ProFormDigitProps) {
  return <AntdProFormDigit {...props} />;
}

// ProFormTextArea
export interface ProFormTextAreaProps extends React.ComponentProps<typeof AntdProFormTextArea> {}
export function ProFormTextArea(props: ProFormTextAreaProps) {
  return <AntdProFormTextArea {...props} />;
}

// ProFormSelect
export interface ProFormSelectProps extends React.ComponentProps<typeof AntdProFormSelect> {}
export function ProFormSelect(props: ProFormSelectProps) {
  return <AntdProFormSelect {...props} />;
}

// ProFormDatePicker
export interface ProFormDatePickerProps extends React.ComponentProps<typeof AntdProFormDatePicker> {}
export function ProFormDatePicker(props: ProFormDatePickerProps) {
  return <AntdProFormDatePicker {...props} />;
}

// ProFormDateTimePicker
export interface ProFormDateTimePickerProps extends React.ComponentProps<typeof AntdProFormDateTimePicker> {}
export function ProFormDateTimePicker(props: ProFormDateTimePickerProps) {
  return <AntdProFormDateTimePicker {...props} />;
}

// ProFormDateRangePicker
export interface ProFormDateRangePickerProps extends React.ComponentProps<typeof AntdProFormDateRangePicker> {}
export function ProFormDateRangePicker(props: ProFormDateRangePickerProps) {
  return <AntdProFormDateRangePicker {...props} />;
}

// ProFormTimePicker
export interface ProFormTimePickerProps extends React.ComponentProps<typeof AntdProFormTimePicker> {}
export function ProFormTimePicker(props: ProFormTimePickerProps) {
  return <AntdProFormTimePicker {...props} />;
}

// ProFormCheckbox
export interface ProFormCheckboxProps extends React.ComponentProps<typeof AntdProFormCheckbox> {}
function FormCheckbox(props: ProFormCheckboxProps) {
  return <AntdProFormCheckbox {...props} />;
}

// ProFormCheckbox.Group
export interface ProFormCheckboxGroupProps extends React.ComponentProps<typeof AntdProFormCheckbox.Group> {}
function FormCheckboxGroup(props: ProFormCheckboxGroupProps) {
  return <AntdProFormCheckbox.Group {...props} />;
}

export const ProFormCheckbox = Object.assign(FormCheckbox, {
  Group: FormCheckboxGroup,
});

// ProFormRadio
export type ProFormRadioProps = React.ComponentProps<typeof AntdProFormRadio>;
function FormRadio(props: ProFormRadioProps) {
  return <AntdProFormRadio {...props} />;
}

// ProFormRadio.Group
export interface ProFormRadioGroupProps extends React.ComponentProps<typeof AntdProFormRadio.Group> {}
function FormRadioGroup(props: ProFormRadioGroupProps) {
  return <AntdProFormRadio.Group {...props} />;
}

export const ProFormRadio = Object.assign(FormRadio, {
  Group: FormRadioGroup,
  Button: AntdProFormRadio.Button,
});

// ProFormSwitch
export interface ProFormSwitchProps extends React.ComponentProps<typeof AntdProFormSwitch> {}
export function ProFormSwitch(props: ProFormSwitchProps) {
  return <AntdProFormSwitch {...props} />;
}

// ProFormRate
export interface ProFormRateProps extends React.ComponentProps<typeof AntdProFormRate> {}
export function ProFormRate(props: ProFormRateProps) {
  return <AntdProFormRate {...props} />;
}

// ProFormSlider
export interface ProFormSliderProps extends React.ComponentProps<typeof AntdProFormSlider> {}
export function ProFormSlider(props: ProFormSliderProps) {
  return <AntdProFormSlider {...props} />;
}

// ProFormUploadButton
export interface ProFormUploadButtonProps extends React.ComponentProps<typeof AntdProFormUploadButton> {}
export function ProFormUploadButton(props: ProFormUploadButtonProps) {
  return <AntdProFormUploadButton {...props} />;
}

// ProFormUploadDragger
export interface ProFormUploadDraggerProps extends React.ComponentProps<typeof AntdProFormUploadDragger> {}
export function ProFormUploadDragger(props: ProFormUploadDraggerProps) {
  return <AntdProFormUploadDragger {...props} />;
}

// ProFormMoney
export interface ProFormMoneyProps extends React.ComponentProps<typeof AntdProFormMoney> {}
export function ProFormMoney(props: ProFormMoneyProps) {
  return <AntdProFormMoney {...props} />;
}

// ProFormCascader
export interface ProFormCascaderProps extends React.ComponentProps<typeof AntdProFormCascader> {}
export function ProFormCascader(props: ProFormCascaderProps) {
  return <AntdProFormCascader {...props} />;
}

// ProFormTreeSelect
export interface ProFormTreeSelectProps extends React.ComponentProps<typeof AntdProFormTreeSelect> {}
export function ProFormTreeSelect(props: ProFormTreeSelectProps) {
  return <AntdProFormTreeSelect {...props} />;
}

// ProFormSegmented
export interface ProFormSegmentedProps extends React.ComponentProps<typeof AntdProFormSegmented> {}
export function ProFormSegmented(props: ProFormSegmentedProps) {
  return <AntdProFormSegmented {...props} />;
}

// ProFormColorPicker
export interface ProFormColorPickerProps extends React.ComponentProps<typeof AntdProFormColorPicker> {}
export function ProFormColorPicker(props: ProFormColorPickerProps) {
  return <AntdProFormColorPicker {...props} />;
}

// ProFormDependency
export interface ProFormDependencyProps extends React.ComponentProps<typeof AntdProFormDependency> {}
export function ProFormDependency(props: ProFormDependencyProps) {
  return <AntdProFormDependency {...props} />;
}

// ProFormList
export interface ProFormListProps extends React.ComponentProps<typeof AntdProFormList> {}
export function ProFormList(props: ProFormListProps) {
  return <AntdProFormList {...props} />;
}

// ProFormFieldSet
export interface ProFormFieldSetProps extends React.ComponentProps<typeof AntdProFormFieldSet> {}
export function ProFormFieldSet(props: ProFormFieldSetProps) {
  return <AntdProFormFieldSet {...props} />;
}
