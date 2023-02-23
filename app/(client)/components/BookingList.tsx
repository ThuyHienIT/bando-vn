'use client';

import { Col, Empty, Row, Typography } from 'antd';
import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';

import { DoubleRightOutlined } from '@ant-design/icons';

import { BookingItem } from './BookingItem';

const ColStyle = styled(Col)``;

const ListStyle = styled(Row)`
  ${ColStyle} {
    margin-bottom: 16px;
  }
`;

const LinkRow = styled.div`
  text-align: right;
`;

interface Props {
  data: BookingItem[];
  heading: string;
  max?: number;
  viewAllLink?: string;
  className?: string;
  onCancel?(item: BookingItem): void;
  onEdit?(item: BookingItem): void;
}

export function BookingList(props: Props) {
  const listData = useMemo(() => {
    if (!props.max || !props.data || props.data.length === 0) return props.data;

    return props.data.slice(0, props.max);
  }, [props.data, props.max]);

  return (
    <div className={props.className}>
      <Typography.Title level={4}>{props.heading}</Typography.Title>
      {listData.length === 0 && (
        <Empty description={`You haven't booked any ${props.heading}`} />
      )}
      {listData.length > 0 && (
        <ListStyle gutter={16}>
          {listData.map((item) => (
            <ColStyle key={item.id} md={6}>
              <BookingItem
                data={item}
                onCancel={props.onCancel}
                onEdit={props.onEdit}
              />
            </ColStyle>
          ))}
        </ListStyle>
      )}

      {props.max && props.data.length > props.max && props.viewAllLink && (
        <LinkRow>
          <Link data-testid="view-all" href={props.viewAllLink}>
            View all <DoubleRightOutlined />
          </Link>
        </LinkRow>
      )}
    </div>
  );
}
