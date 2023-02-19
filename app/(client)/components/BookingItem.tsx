'use client';

import Image from 'next/image';
import { memo } from 'react';
import { Button, Card, Typography } from 'antd';
import Link from 'next/link';

import CalendarOutlined from '@ant-design/icons/lib/icons/CalendarOutlined';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';

interface Props {
  data: BookingItem;
}

export function BookingItem(props: Props) {
  return (
    <Card
      size="small"
      cover={
        props.data.facility?.thumbnail ? (
          <Image
            alt={props.data.facility.name}
            src={props.data.facility?.thumbnail}
            width={100}
            height={100}
          />
        ) : null
      }
      actions={[
        <Button key="details" type="text" size="small" danger>
          Cancel
        </Button>,
        <Link href={`/facility/${props.data.id}`} key="details">
          <Button icon={<EditOutlined />} type="text" size="small">
            Edit
          </Button>
        </Link>,
      ]}
    >
      <Typography.Text ellipsis>{`From: ${props.data.from}`}</Typography.Text>
      <Typography.Text ellipsis>{`To: ${props.data.to}`}</Typography.Text>
    </Card>
  );
}
