import { Empty, Image, Skeleton, Typography } from 'antd';
import { memo, useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import {
  EnvironmentOutlined,
  GlobalOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { SmallDivider } from '@components/Overlay';
import request from '@lib/request';
import { activeItemIdState } from '@recoil/common';

const Section = styled.div`
  padding: 16px;
`;
const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;

  .ant-image {
    flex-basis: 50%;
    padding: 2px;
  }
`;
interface Props {}
export const Details = memo<Props>((props) => {
  const activeItemId = useRecoilValue(activeItemIdState);
  const [details, setDetails] = useState<CompanyType>();
  const [loading, setLoading] = useState<boolean>();

  const loadDetails = useCallback(async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const resp = await request<CompanyType[]>(`/api/search`, {
        signal,
      });

      setDetails(resp[0]);
      setLoading(false);
    } catch (e: any) {
      console.log('FETCH DETAILS ERROR::', e);
      if (e.message.includes('The user aborted a request.')) {
        setLoading(undefined);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadDetails(controller.signal);

    return () => {
      setLoading(undefined);
      setDetails(undefined);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItemId]);

  if (typeof loading !== 'boolean' || loading)
    return (
      <>
        <Skeleton.Button block style={{ height: 200 }} />
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

  if (!details) return <Empty description="Not found" />;

  return (
    <div>
      <Image src={details.photos[0]} alt={details.name} width="100%" />
      <Section>
        <Typography.Title level={4}>{details.name}</Typography.Title>

        <SmallDivider />

        <Typography.Paragraph>
          <EnvironmentOutlined /> <strong>{details.address}</strong>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <PhoneOutlined /> <strong>{details.tel}</strong>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <GlobalOutlined /> <a href={details.url}>Visit us</a>
        </Typography.Paragraph>

        <SmallDivider />

        <Typography.Paragraph>{details.synopsis}</Typography.Paragraph>
        <SmallDivider />

        <Typography.Title level={5}>Photos Gallery</Typography.Title>
        <Gallery>
          {details.photos.map((url, index) => (
            <Image key={`${url}-${index}`} src={url} alt={details.name} />
          ))}
        </Gallery>
      </Section>
    </div>
  );
});
