'use client';

import Image from 'next/image';
// import { memo } from 'react';
// import { Card, Typography } from 'antd';
import { FacilityItemCmp } from '@app/app/(client)/components/FacilityItem';
import { Col, Row, Typography } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { useMemo } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';

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
  data: FacilityItem[];
  heading: string;
  max?: number;
  viewAllLink?: string;
  className?: string;
}

export function FacilityList(props: Props) {
  const listData = useMemo(() => {
    if (!props.max) return props.data;

    return props.data.slice(0, props.max);
  }, [props.data, props.max]);

  return (
    <div className={props.className}>
      <Typography.Title level={4}>{props.heading}</Typography.Title>
      <ListStyle gutter={16}>
        {listData.map((item) => (
          <ColStyle key={item.id} md={6}>
            <FacilityItemCmp data={item} />
          </ColStyle>
        ))}
      </ListStyle>
      {props.max && props.data.length > props.max && props.viewAllLink && (
        <LinkRow>
          <Link href={props.viewAllLink}>
            View all <DoubleRightOutlined />
          </Link>
        </LinkRow>
      )}
    </div>
  );
}
