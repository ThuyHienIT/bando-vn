import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

import { LoadingOutlined } from '@ant-design/icons';
import { Overlay } from '@components/Overlay';
import { activeAttractionTypeState, activeItemIdState } from '@recoil/common';

import { Attractions } from './components/Attractions';
import { Categories } from './components/Categories';
import { Details } from './components/Details';
import { Search } from './components/Search';

const Wrapper = styled.main`
  position: relative;
`;

const ToolStyle = styled.div<{ active?: boolean }>`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 316px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  height: calc(100vh - 32px);
  overflow-y: auto;
  z-index: 1;
  opacity: 0;
  transform: translate3d(calc(-100% - 8px), 0, 0);
  transition: all 0.2s ease;

  ${(p) =>
    p.active &&
    css`
      opacity: 1;
      transform: translate3d(0, 0, 0);
    `}
`;

const EsriMapWithNoSSR = dynamic(() => import('./components/Map'), {
  loading: () => (
    <Overlay>
      <LoadingOutlined />
    </Overlay>
  ),
  ssr: false,
});

export const HomePage = memo(() => {
  const [activeItemId, setActiveItemId] = useRecoilState(activeItemIdState);
  const activeAttraction = useRecoilValue(activeAttractionTypeState);

  return (
    <Wrapper>
      <EsriMapWithNoSSR />

      <Search />

      <Categories />

      <ToolStyle active={Boolean(activeItemId) || Boolean(activeAttraction)}>
        {Boolean(activeItemId) ? (
          <Details />
        ) : (
          Boolean(activeAttraction) && <Attractions />
        )}
      </ToolStyle>
    </Wrapper>
  );
});
