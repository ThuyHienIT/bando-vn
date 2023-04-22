'use client';

import { Button, Card, Image, Typography } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

import { EditOutlined } from '@ant-design/icons';

const CardStyle = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;

  && .ant-card-actions {
    margin-top: auto;
  }

  .ant-card-cover {
    padding-bottom: 60%;
    overflow: hidden;
    position: relative;

    .ant-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
`;

const ImageStyle = styled(Image)``;

interface Props {
  data: CompanyType;
}

export function FacilityItemCmp(props: Props) {
  return (
    <CardStyle
      hoverable
      size="small"
      cover={
        props.data.photos?.[0] ? (
          <ImageStyle alt={props.data.name} src={props.data.photos[0]} />
        ) : null
      }
      actions={[
        <Link href={`/admin/restaurant/edit/${props.data.id}`} key="details">
          <Button type="text" size="small" icon={<EditOutlined />}>
            Edit
          </Button>
        </Link>,
      ]}
    >
      <Typography.Title level={5}>{props.data.name}</Typography.Title>
      <Typography.Text ellipsis>{props.data.synopsis}</Typography.Text>
    </CardStyle>
  );
}
