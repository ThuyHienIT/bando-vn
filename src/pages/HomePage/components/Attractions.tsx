import { Avatar, Skeleton, Typography } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import { SmallDivider } from '@components/Overlay';
import request from '@lib/request';
import { activeAttractionTypeState, activeItemIdState } from '@recoil/common';

const AvatarStyle = styled(Avatar)``;
const Section = styled.div`
  padding: 16px;
  border-top: 1px solid #dddddd;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  ${AvatarStyle} {
    flex-shrink: 0;
  }

  &:hover {
    background-color: #f9f9f9;
  }

  .ant-typography {
    margin: 0;
  }
`;

interface Props {}
export const Attractions = memo<Props>((props) => {
  const activeAttraction = useRecoilValue(activeAttractionTypeState);
  const [itemList, setItemList] = useState<CompanyType[]>();
  const [loading, setLoading] = useState<boolean>();
  const setActiveItemId = useSetRecoilState(activeItemIdState);

  const loadData = useCallback(
    async (signal: AbortSignal) => {
      try {
        setLoading(true);
        const resp = await request<CompanyType[]>(
          `/api/search?type=${activeAttraction}`,
          {
            signal,
          }
        );

        setItemList(resp);
        setLoading(false);
      } catch (e: any) {
        console.log('FETCH DETAILS ERROR::', e);
        if (e.message.includes('The user aborted a request.')) {
          setLoading(undefined);
        } else {
          setLoading(false);
        }
      }
    },
    [activeAttraction]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const id = e.currentTarget.dataset.id;

      setActiveItemId(id ?? '');
    },
    [setActiveItemId]
  );

  useEffect(() => {
    const controller = new AbortController();
    loadData(controller.signal);

    return () => {
      setLoading(undefined);
      setItemList(undefined);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAttraction]);

  if (typeof loading !== 'boolean' || loading)
    return (
      <>
        <Skeleton.Button block style={{ height: 56 }} />
        <Section>
          <Skeleton />
        </Section>
        <SmallDivider />
        <Section>
          <Skeleton />
        </Section>
        <SmallDivider />
        <Section>
          <Skeleton />
        </Section>
      </>
    );

  return (
    <div style={{ marginTop: 56 }}>
      {itemList?.map((item) => (
        <Section key={item.id} data-id={item.id} onClick={handleClick}>
          <AvatarStyle src={item.photos[0]} />
          <div>
            <Typography.Text>
              <strong>{item.name}</strong>
            </Typography.Text>
            <Typography.Paragraph>
              <EnvironmentOutlined /> {item.address}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <PhoneOutlined /> <a href={`tel:${item.tel}`}>{item.tel}</a>
            </Typography.Paragraph>
          </div>
        </Section>
      ))}
    </div>
  );
});
