import { PlusOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Form, Input, message, Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Modal } from '~/components/ui/modal';
import { PageContainer } from '~/components/ui/page-container';
import { ProForm } from '~/components/ui/pro-form';
import { ProFormSelect, ProFormText, ProFormTextArea } from '~/components/ui/pro-form-field';

export const Route = createFileRoute('/_admin/_auth/example/modal/')({
  component: ModalExamplePage,
});

// User form interface
interface UserFormValues {
  name: string
  email: string
  role: string
  department: string
  notes?: string
}

// Basic Modal with Ant Design Form
const BasicFormModal = NiceModal.create(() => {
  const modal = useModal();
  const { t } = useTranslation();
  const [form] = Form.useForm<UserFormValues>();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      message.success(t('example.modal.userCreated'));
      modal.resolve(values);
      modal.hide();
      form.resetFields();
    }
    catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    modal.hide();
    form.resetFields();
  };

  return (
    <Modal
      title={t('example.modal.createUser')}
      open={modal.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={modal.remove}
      width={600}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{ role: 'user' }}
      >
        <Form.Item
          name='name'
          label={t('field.fullName')}
          rules={[
            { required: true, message: t('validation.nameRequired') },
            { min: 2, message: t('validation.minLength', { field: t('field.name'), min: 2 }) },
          ]}
        >
          <Input placeholder={t('field.placeholder.fullName')} />
        </Form.Item>

        <Form.Item
          name='email'
          label={t('field.email')}
          rules={[
            { required: true, message: t('validation.emailRequired') },
            { type: 'email', message: t('validation.email') },
          ]}
        >
          <Input placeholder={t('field.placeholder.email')} />
        </Form.Item>

        <Form.Item
          name='role'
          label={t('field.role')}
          rules={[{ required: true, message: t('validation.roleRequired') }]}
        >
          <Select placeholder={t('field.placeholder.role')}>
            <Select.Option value='admin'>{t('role.admin')}</Select.Option>
            <Select.Option value='user'>{t('role.user')}</Select.Option>
            <Select.Option value='guest'>{t('role.guest')}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='department'
          label={t('field.department')}
          rules={[{ required: true, message: t('validation.departmentRequired') }]}
        >
          <Input placeholder={t('field.placeholder.department')} />
        </Form.Item>

        <Form.Item name='notes' label={t('field.notes')}>
          <Input.TextArea rows={3} placeholder={t('field.placeholder.notes')} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

// ProForm Modal Example
const ProFormModal = NiceModal.create(() => {
  const modal = useModal();
  const { t } = useTranslation();

  const handleFinish = async (values: UserFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    message.success(t('example.modal.userUpdated'));
    modal.resolve(values);
    modal.hide();
    return true;
  };

  return (
    <Modal
      title={t('example.modal.editUser')}
      open={modal.visible}
      onCancel={modal.hide}
      afterClose={modal.remove}
      width={600}
      footer={null}
    >
      <ProForm<UserFormValues>
        onFinish={handleFinish}
        submitter={{
          searchConfig: {
            submitText: t('common.save'),
            resetText: t('common.cancel'),
          },
          resetButtonProps: {
            onClick: () => modal.hide(),
          },
        }}
        initialValues={{
          name: 'John Doe',
          email: 'john@example.com',
          role: 'admin',
          department: 'Engineering',
        }}
      >
        <ProFormText
          name='name'
          label={t('field.fullName')}
          placeholder={t('field.placeholder.fullName')}
          rules={[
            { required: true, message: t('validation.nameRequired') },
            { min: 2, message: t('validation.minLength', { field: t('field.name'), min: 2 }) },
          ]}
        />

        <ProFormText
          name='email'
          label={t('field.email')}
          placeholder={t('field.placeholder.email')}
          rules={[
            { required: true, message: t('validation.emailRequired') },
            { type: 'email', message: t('validation.email') },
          ]}
        />

        <ProFormSelect
          name='role'
          label={t('field.role')}
          placeholder={t('field.placeholder.role')}
          options={[
            { label: t('role.admin'), value: 'admin' },
            { label: t('role.user'), value: 'user' },
            { label: t('role.guest'), value: 'guest' },
          ]}
          rules={[{ required: true, message: t('validation.roleRequired') }]}
        />

        <ProFormText
          name='department'
          label={t('field.department')}
          placeholder={t('field.placeholder.department')}
          rules={[{ required: true, message: t('validation.departmentRequired') }]}
        />

        <ProFormTextArea
          name='notes'
          label={t('field.notes')}
          placeholder={t('field.placeholder.notes')}
          fieldProps={{ rows: 3 }}
        />
      </ProForm>
    </Modal>
  );
});

// Confirm Modal Example
const ConfirmModal = NiceModal.create(() => {
  const modal = useModal();
  const { t } = useTranslation();

  const handleConfirm = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    message.success(t('example.modal.itemDeleted'));
    modal.resolve(true);
    modal.hide();
  };

  return (
    <Modal
      title={t('example.modal.deleteConfirmTitle')}
      open={modal.visible}
      onOk={handleConfirm}
      onCancel={modal.hide}
      afterClose={modal.remove}
      okText={t('common.delete')}
      okButtonProps={{ danger: true }}
    >
      <p>{t('example.modal.deleteConfirmContent')}</p>
    </Modal>
  );
});

function showConfirmModal() {
  NiceModal.show(ConfirmModal);
}

function ModalExamplePage() {
  const { t } = useTranslation();

  const showBasicModal = () => {
    NiceModal.show(BasicFormModal);
  };

  const showProFormModal = () => {
    NiceModal.show(ProFormModal);
  };

  return (
    <PageContainer>
      <div className='space-y-4'>
        <div>
          <h2 className='text-xl font-semibold mb-4'>{t('example.modal.title')}</h2>
          <p className='text-gray-600 mb-6'>
            {t('example.modal.description')}
          </p>
        </div>

        <Space size='middle' wrap>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={showBasicModal}
          >
            {t('example.modal.openBasic')}
          </Button>

          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={showProFormModal}
          >
            {t('example.modal.openProForm')}
          </Button>

          <Button danger onClick={showConfirmModal}>
            {t('example.modal.showConfirm')}
          </Button>
        </Space>

        <div className='mt-8 p-4 bg-gray-50 rounded'>
          <h3 className='text-lg font-semibold mb-2'>{t('example.modal.features')}</h3>
          <ul className='list-disc list-inside space-y-1 text-gray-700'>
            <li>{t('example.modal.feature1')}</li>
            <li>{t('example.modal.feature2')}</li>
            <li>{t('example.modal.feature3')}</li>
            <li>{t('example.modal.feature4')}</li>
            <li>{t('example.modal.feature5')}</li>
            <li>{t('example.modal.feature6')}</li>
          </ul>
        </div>

        <div className='mt-4 p-4 bg-blue-50 rounded'>
          <h3 className='text-lg font-semibold mb-2'>{t('example.modal.usagePattern')}</h3>
          <pre className='text-sm overflow-x-auto'>
            {`// Create a modal component
const MyModal = NiceModal.create(() => {
  const modal = useModal();
  
  return (
    <Modal
      open={modal.visible}
      onCancel={modal.hide}
      afterClose={modal.remove}
    >
      {/* Modal content */}
    </Modal>
  );
});

// Show the modal
NiceModal.show(MyModal);`}
          </pre>
        </div>
      </div>
    </PageContainer>
  );
}
