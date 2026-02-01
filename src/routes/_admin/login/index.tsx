import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '~/components/features/language-switcher';
import { LoginForm } from '~/components/ui/pro-form';
import { ProFormCheckbox, ProFormText } from '~/components/ui/pro-form-field';
import { useMessage } from '~/hooks/useMessage';

export const Route = createFileRoute('/_admin/login/')({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const message = useMessage();
  const handleSubmit = async (_values: { username: string, password: string, autoLogin: boolean }) => {
    // TODO: 实现真实的登录逻辑
    message.success(t('auth.loginSuccess'));
    navigate({ to: '/example/table' });
    return true;
  };

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden'>

      <div className='absolute inset-0 bg-white'></div>

      <div className='fixed right-6 top-6 z-10 flex gap-3'>
        <LanguageSwitcher />
      </div>

      <div className='relative z-10 w-full max-w-md'>
        <LoginForm
          containerStyle={{
            background: 'rgba(255,255,255,.8)',
            borderRadius: 16,
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,0,0,.06)',
          }}
          title={t('auth.loginTitle')}
          subTitle={t('auth.loginSubTitle')}
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              submitText: t('auth.login'),
            },
          }}
        >
          <ProFormText
            name='username'
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className='text-gray-400' />,
            }}
            placeholder={t('auth.usernamePlaceholder')}
            rules={[
              {
                required: true,
                message: t('auth.usernameRequired'),
              },
            ]}
          />
          <ProFormText.Password
            name='password'
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className='text-gray-400' />,
            }}
            placeholder={t('auth.passwordPlaceholder')}
            rules={[
              {
                required: true,
                message: t('auth.passwordRequired'),
              },
            ]}
          />
          <div className='mb-6 flex items-center justify-between'>
            <ProFormCheckbox noStyle name='autoLogin'>
              {t('auth.rememberMe')}
            </ProFormCheckbox>
            <a className='text-blue-500 hover:text-blue-600'>{t('auth.forgotPassword')}</a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
}
