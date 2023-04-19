import { Divider } from 'antd';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SmallDivider = styled(Divider)`
  margin-top: 16px;
  margin-bottom: 16px;
`;
