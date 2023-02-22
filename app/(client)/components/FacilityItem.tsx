'use client';

import { Button, Card, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

import { EyeOutlined } from '@ant-design/icons';

interface Props {
  data: FacilityItem;
}

export function FacilityItemCmp(props: Props) {
  return (
    <Card
      size="small"
      cover={
        props.data.thumbnail ? (
          <Image
            alt={props.data.name}
            src={props.data.thumbnail}
            width={100}
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
    </Card>
  );
}
