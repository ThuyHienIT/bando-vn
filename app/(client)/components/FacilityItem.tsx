'use client';

import { Button, Card, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { EyeOutlined } from '@ant-design/icons';

const CardStyle = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;

  && .ant-card-actions {
    margin-top: auto;
  }
`;

const ImageStyle = styled(Image)`
  width: auto;
  height: auto;
`;

interface Props {
  data: FacilityItem;
}

export function FacilityItemCmp(props: Props) {
  return (
    <CardStyle
      size="small"
      cover={
        props.data.thumbnail ? (
          <ImageStyle
            alt={props.data.name}
            src={props.data.thumbnail}
            width={240}
            height={100}
          />
        ) : null
      }
      actions={[
        <Link href={`/facility/${props.data.id}`} key="details">
          <Button type="text" size="small" icon={<EyeOutlined />}>
            Details
          </Button>
        </Link>,
      ]}
    >
      <Typography.Title level={4}>{props.data.name}</Typography.Title>
      <Typography.Text ellipsis>{props.data.description}</Typography.Text>
    </CardStyle>
  );
}
