import { Button, Modal, Space, Table, Tag, Tooltip, Typography } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { DeleteOutlined, KeyOutlined, PlusOutlined } from '@ant-design/icons';
import { BasicLayout } from '@components/Layout/Layout';

import { AddForm } from './AddForm';

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  margin-bottom: 8px;
`;
interface Props {
  user?: UserInfo;
  users?: UserInfo[];
}
const UserPage = memo<Props>((props) => {
  const [activeUserId, setActiveUserId] = useState<string>();
  const [opened, setOpened] = useState(false);

  const toggleModal = useCallback(() => {
    setOpened((o) => !o);
  }, []);

  const handleChangePassClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setActiveUserId(e.currentTarget.dataset.id ?? '');
      toggleModal();
    },
    [toggleModal]
  );

  const activeUser = useMemo(
    () => props.users?.find((i) => i.id === activeUserId),
    [activeUserId, props.users]
  );

  return (
    <BasicLayout>
      <Heading>
        <Typography.Title style={{ margin: 0 }} level={4}>
          Users
        </Typography.Title>
        <Button icon={<PlusOutlined />} onClick={toggleModal}>
          Add New User
        </Button>
      </Heading>
      <Table
        bordered
        rowKey="id"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
          },
          {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
            render: (v) => <Tag color={v === 'admin' ? 'blue' : ''}>{v}</Tag>,
          },
          {
            title: 'Action',
            key: 'id',
            dataIndex: 'id',
            render: (id) => {
              return (
                <Space>
                  <Button danger icon={<DeleteOutlined />}></Button>
                  <Tooltip title="Change password">
                    <Button
                      data-id={id}
                      onClick={handleChangePassClick}
                      icon={<KeyOutlined />}
                    ></Button>
                  </Tooltip>
                </Space>
              );
            },
          },
        ]}
        dataSource={props.users}
      />

      <Modal
        title={Boolean(activeUserId) ? 'Update' : 'Add New User'}
        footer={null}
        open={opened}
        onCancel={toggleModal}
        destroyOnClose
      >
        <AddForm data={activeUser} onSubmitted={toggleModal} />
      </Modal>
    </BasicLayout>
  );
});

export default UserPage;
