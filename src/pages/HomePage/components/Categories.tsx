import { Button } from 'antd';
import { memo, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  BankOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { activeAttractionTypeState, activeItemIdState } from '@recoil/common';

const Wrapper = styled.div`
  position: absolute;
  top: 16px;
  display: flex;
  gap: 8px;
  left: 360px;
`;

const ButtonStyle = styled(Button)`
  border-radius: 50px;
`;

export const Categories = memo(() => {
  const updateActiveAttractionType = useSetRecoilState(
    activeAttractionTypeState
  );

  const updateActiveItemId = useSetRecoilState(activeItemIdState);

  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      const type = e.currentTarget.dataset.type ?? '';
      updateActiveItemId('');
      updateActiveAttractionType(type);
    },
    [updateActiveAttractionType, updateActiveItemId]
  );

  return (
    <Wrapper>
      <ButtonStyle
        onClick={handleClick}
        data-type="restaurant"
        icon={<CoffeeOutlined />}
        size="middle"
      >
        Restaurants
      </ButtonStyle>
      <ButtonStyle
        onClick={handleClick}
        data-type="attraction"
        icon={<EnvironmentOutlined />}
        size="middle"
      >
        Attractions
      </ButtonStyle>
      <ButtonStyle
        onClick={handleClick}
        data-type="hotel"
        icon={<BankOutlined />}
        size="middle"
      >
        Hotels
      </ButtonStyle>
      <ButtonStyle
        onClick={handleClick}
        data-type="shopping"
        icon={<ShoppingCartOutlined />}
        size="middle"
      >
        Shopping Mall
      </ButtonStyle>
    </Wrapper>
  );
});
