import { createFileRoute } from '@tanstack/react-router';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '~/components/ui/page-container';
import { ProForm } from '~/components/ui/pro-form';
import {
  ProFormCheckbox,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '~/components/ui/pro-form-field';

export const Route = createFileRoute('/_admin/_auth/example/form/')({
  component: FormExamplePage,
});

interface FormValues {
  name: string
  email: string
  age: number
  gender: string
  country: string
  bio: string
  birthDate: string
  notifications: boolean
  interests: string[]
}

function FormExamplePage() {
  const { t } = useTranslation();

  const handleFinish = async (_values: FormValues) => {
    // console.log('Form values:', _values);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    message.success(t('example.form.success'));
    return true;
  };

  return (
    <PageContainer>
      <ProForm<FormValues>
        onFinish={handleFinish}
        layout='vertical'
        submitter={{
          searchConfig: {
            submitText: t('common.submit'),
            resetText: t('common.reset'),
          },
          resetButtonProps: {
            style: {
              display: 'block',
            },
          },
        }}
        style={{ maxWidth: 800 }}
      >
        <ProForm.Group>
          <ProFormText
            name='name'
            label={t('example.form.fullName')}
            width='md'
            placeholder={t('example.form.placeholder.name')}
            rules={[
              {
                required: true,
                message: t('validation.required', { field: t('example.form.fullName') }),
              },
              {
                min: 2,
                message: t('validation.minLength', { field: t('example.form.fullName'), min: 2 }),
              },
            ]}
          />
          <ProFormText
            name='email'
            label={t('example.form.email')}
            width='md'
            placeholder={t('example.form.placeholder.email')}
            rules={[
              {
                required: true,
                message: t('validation.required', { field: t('example.form.email') }),
              },
              {
                type: 'email',
                message: t('validation.email'),
              },
            ]}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormDigit
            name='age'
            label={t('example.form.age')}
            width='sm'
            placeholder={t('example.form.placeholder.age')}
            min={1}
            max={120}
            rules={[
              {
                required: true,
                message: t('validation.required', { field: t('example.form.age') }),
              },
            ]}
          />
          <ProFormRadio.Group
            name='gender'
            label={t('example.form.gender')}
            width='sm'
            options={[
              { label: t('example.form.gender.male'), value: 'male' },
              { label: t('example.form.gender.female'), value: 'female' },
              { label: t('example.form.gender.other'), value: 'other' },
            ]}
            rules={[
              {
                required: true,
                message: t('validation.requiredSelect', { field: t('example.form.gender') }),
              },
            ]}
          />
        </ProForm.Group>

        <ProFormSelect
          name='country'
          label={t('example.form.country')}
          width='md'
          placeholder={t('example.form.placeholder.country')}
          options={[
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'Canada', value: 'ca' },
            { label: 'Australia', value: 'au' },
            { label: 'China', value: 'cn' },
            { label: 'Japan', value: 'jp' },
          ]}
          showSearch
          rules={[
            {
              required: true,
              message: t('validation.requiredSelect', { field: t('example.form.country') }),
            },
          ]}
        />

        <ProFormTextArea
          name='bio'
          label={t('example.form.bio')}
          placeholder={t('example.form.placeholder.bio')}
          fieldProps={{
            rows: 4,
            maxLength: 500,
            showCount: true,
          }}
        />

        <ProFormCheckbox.Group
          name='interests'
          label={t('example.form.interests')}
          options={[
            { label: t('example.form.interest.tech'), value: 'tech' },
            { label: t('example.form.interest.sports'), value: 'sports' },
            { label: t('example.form.interest.music'), value: 'music' },
            { label: t('example.form.interest.travel'), value: 'travel' },
            { label: t('example.form.interest.reading'), value: 'reading' },
          ]}
        />

        <ProFormSwitch
          name='notifications'
          label={t('example.form.notifications')}
          fieldProps={{
            checkedChildren: 'On',
            unCheckedChildren: 'Off',
          }}
        />
      </ProForm>
    </PageContainer>
  );
}
