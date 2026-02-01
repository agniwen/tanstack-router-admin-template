import type { ProColumns } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, message, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { Modal } from '~/components/ui/modal';
import { PageContainer } from '~/components/ui/page-container';
import { ProForm } from '~/components/ui/pro-form';
import { ProFormDigit, ProFormSelect, ProFormText } from '~/components/ui/pro-form-field';
import { ProTable } from '~/components/ui/pro-table';

export const Route = createFileRoute('/_admin/_auth/example/table/')({
  component: TableExamplePage,
});

interface DataItem {
  id: number
  name: string
  age: number
  email: string
  status: 'active' | 'inactive'
  role: string
  createdAt: string
}

interface UserFormValues {
  id?: number
  name: string
  age: number
  email: string
  status: 'active' | 'inactive'
  role: string
}

// User Form Modal (for both Create and Edit)
const UserFormModal = NiceModal.create<{ user?: DataItem }>(({ user }) => {
  const modal = useModal();
  const { t } = useTranslation();
  const isEdit = !!user;

  const handleFinish = async (values: UserFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const msgKey = isEdit ? 'example.table.userUpdated' : 'example.table.userCreated';
    message.success(t(msgKey, { name: values.name }));
    modal.resolve(values);
    modal.hide();
    return true;
  };

  return (
    <Modal
      title={t(isEdit ? 'example.table.editUser' : 'example.table.addUser')}
      open={modal.visible}
      onCancel={modal.hide}
      afterClose={modal.remove}
      width={600}
      footer={() => null}
    >
      <ProForm<UserFormValues>
        onFinish={handleFinish}
        submitter={{
          searchConfig: {
            submitText: t(isEdit ? 'common.save' : 'common.create'),
            resetText: t('common.cancel'),
          },
          resetButtonProps: {
            onClick: () => modal.hide(),
          },
        }}
        initialValues={user || {
          status: 'active',
          role: 'user',
        }}
      >
        <ProFormText
          name='name'
          label={t('field.fullName')}
          placeholder={t('field.placeholder.name')}
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

        <ProFormDigit
          name='age'
          label={t('field.age')}
          placeholder={t('field.placeholder.age')}
          min={1}
          max={120}
          rules={[
            { required: true, message: t('validation.ageRequired') },
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

        <ProFormSelect
          name='status'
          label={t('field.status')}
          placeholder={t('field.placeholder.status')}
          options={[
            { label: t('status.active'), value: 'active' },
            { label: t('status.inactive'), value: 'inactive' },
          ]}
          rules={[{ required: true, message: t('validation.statusRequired') }]}
        />
      </ProForm>
    </Modal>
  );
});

function TableExamplePage() {
  const { t } = useTranslation();

  const showAddUserModal = () => {
    NiceModal.show(UserFormModal);
  };

  const showEditUserModal = (user: DataItem) => {
    NiceModal.show(UserFormModal, { user });
  };

  const columns: ProColumns<DataItem>[] = [
    {
      title: t('example.table.column.id'),
      dataIndex: 'id',
      width: 80,
      sorter: true,
      fixed: 'left',
    },
    {
      title: t('example.table.column.name'),
      dataIndex: 'name',
      width: 150,
      copyable: true,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: t('validation.nameRequired'),
          },
        ],
      },
    },
    {
      title: t('example.table.column.age'),
      dataIndex: 'age',
      width: 100,
      valueType: 'digit',
      sorter: true,
    },
    {
      title: t('example.table.column.email'),
      dataIndex: 'email',
      width: 200,
      copyable: true,
      ellipsis: true,
      search: false,
    },
    {
      title: t('example.table.column.status'),
      dataIndex: 'status',
      width: 120,
      valueType: 'select',
      valueEnum: {
        active: { text: t('status.active'), status: 'Success' },
        inactive: { text: t('status.inactive'), status: 'Default' },
      },
      render: (_, record) => (
        <Tag color={record.status === 'active' ? 'green' : 'default'}>
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: t('example.table.column.role'),
      dataIndex: 'role',
      width: 120,
      valueType: 'select',
      valueEnum: {
        admin: { text: t('role.admin') },
        user: { text: t('role.user') },
        guest: { text: t('role.guest') },
      },
    },
    {
      title: t('example.table.column.createdAt'),
      dataIndex: 'createdAt',
      width: 180,
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: t('example.table.column.actions'),
      width: 180,
      fixed: 'right',
      valueType: 'option',
      render: (_, record) => [
        <a key='edit' onClick={() => showEditUserModal(record)}>{t('common.edit')}</a>,
        <a key='view'>{t('common.view')}</a>,
        <a key='delete' style={{ color: 'red' }}>
          {t('common.delete')}
        </a>,
      ],
    },
  ];

  // Mock data fetch function
  const fetchData = async (params: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const data: DataItem[] = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      age: 20 + (index % 50),
      email: `user${index + 1}@example.com`,
      status: index % 2 === 0 ? 'active' : 'inactive',
      role: ['admin', 'user', 'guest'][index % 3],
      createdAt: new Date(Date.now() - index * 86400000).toISOString(),
    }));

    // Simple filtering based on params
    let filteredData = [...data];

    if (params.name) {
      filteredData = filteredData.filter(item =>
        item.name.toLowerCase().includes(params.name.toLowerCase()),
      );
    }

    if (params.status) {
      filteredData = filteredData.filter(item => item.status === params.status);
    }

    if (params.role) {
      filteredData = filteredData.filter(item => item.role === params.role);
    }

    // Pagination
    const { current = 1, pageSize = 10 } = params;
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      success: true,
      total: filteredData.length,
    };
  };

  return (
    <PageContainer>
      <ProTable<DataItem>
        columns={columns}
        request={fetchData}
        rowKey='id'
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        dateFormatter='string'
        headerTitle={t('example.table.userList')}
        toolBarRender={() => [
          <Button key='button' icon={<PlusOutlined />} type='primary' onClick={showAddUserModal}>
            {t('example.table.addNew')}
          </Button>,
        ]}
        options={{
          density: true,
          fullScreen: true,
          reload: true,
          setting: true,
        }}
      />
    </PageContainer>
  );
}
