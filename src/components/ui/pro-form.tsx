import type { ProFormProps as ProFormPropsBase } from '@ant-design/pro-components';
import { LoginForm as AntdLoginForm, ProForm as AntdProForm } from '@ant-design/pro-components';

interface ProFormProps<T extends Record<string, any>> extends ProFormPropsBase<T> {
  children?: React.ReactNode | React.ReactNode[]
}
function Form<T extends Record<string, any>>(props: ProFormProps<T>) {
  return <AntdProForm<T> {...props} />;
}

interface ProFormGroupProps extends React.ComponentProps<typeof AntdProForm.Group> {
}
function FormGroup(props: ProFormGroupProps) {
  return <AntdProForm.Group {...props} />;
}

interface ProFormItemProps extends React.ComponentProps<typeof AntdProForm.Item> {}
function FormItem(props: ProFormItemProps) {
  return <AntdProForm.Item {...props} />;
}

interface ProFormProviderProps extends React.ComponentProps<typeof AntdProForm.Provider> {

}
function FormProvider(props: ProFormProviderProps) {
  return <AntdProForm.Provider {...props} />;
}

interface FormErrorListProps extends React.ComponentProps<typeof AntdProForm.ErrorList> {

}

function FormErrorList(props: FormErrorListProps) {
  return <AntdProForm.ErrorList {...props} />;
}

interface EditOrReadOnlyContextProps extends React.ComponentProps<typeof AntdProForm.EditOrReadOnlyContext> {

}
function FormEditOrReadOnlyContext(props: EditOrReadOnlyContextProps) {
  return <AntdProForm.EditOrReadOnlyContext {...props} />;
}

// LoginForm
interface LoginFormProps<T extends Record<string, any>> extends React.ComponentProps<typeof AntdLoginForm<T>> {}
export function LoginForm<T extends Record<string, any>>(props: LoginFormProps<T>) {
  return <AntdLoginForm<T> {...props} />;
}

export const ProForm = Object.assign(Form, {
  Group: FormGroup,
  Item: FormItem,
  Provider: FormProvider,
  ErrorList: FormErrorList,
  EditOrReadOnlyContext: FormEditOrReadOnlyContext,
  useFormInstance: AntdProForm.useFormInstance,
  useForm: AntdProForm.useForm,
  useWatch: AntdProForm.useWatch,
});
