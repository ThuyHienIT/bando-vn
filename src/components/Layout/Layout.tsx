import { Layout } from 'antd';
import { memo, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { userInfoState } from '@recoil/user';

import { Container } from './Container';
import { Footer } from './Footer';
import { Header } from './Header';

const LayoutStyle = styled(Layout)`
  &&& {
    min-height: 100vh;
  }
`;

interface Props {
  children: React.ReactNode;
  userInfo?: UserInfo;
}
export const BasicLayout = memo<Props>(function BasicLayout(props) {
  const [userInfo, updateUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    if (!userInfo && props.userInfo) {
      updateUserInfo(props.userInfo);
    }
  }, [props.userInfo]);

  return (
    <LayoutStyle>
      <Header />
      <Layout.Content>
        <Container className="main-container">{props.children}</Container>
      </Layout.Content>
      <Footer />
    </LayoutStyle>
  );
});

/*


 <Layout>
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
      />
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        Content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  
*/
