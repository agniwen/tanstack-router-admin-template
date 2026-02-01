import { useNavigate } from '@tanstack/react-router';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';

interface ExceptionPageProps {
  status: '403' | '404' | '500'
  title?: string
  subTitle?: string
}

/**
 * 统一的异常页面组件
 * 使用 Ant Design 的 Result 组件
 */
export function ExceptionPage({ status, title, subTitle }: ExceptionPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate({ to: '/' });
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Result
        status={status}
        title={title || t(`exception.${status}.title`)}
        subTitle={subTitle || t(`exception.${status}.subTitle`)}
        extra={(
          <Button type='primary' onClick={handleBackHome}>
            {t('exception.backHome')}
          </Button>
        )}
      />
    </div>
  );
}

/**
 * 404 - 页面不存在
 */
export function NotFoundPage() {
  return <ExceptionPage status='404' />;
}

/**
 * 403 - 无权限访问
 */
export function ForbiddenPage() {
  return <ExceptionPage status='403' />;
}

/**
 * 500 - 服务器错误
 */
export function ServerErrorPage() {
  return <ExceptionPage status='500' />;
}
