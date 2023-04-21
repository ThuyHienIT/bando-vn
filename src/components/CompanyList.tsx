'use client';

import { Button, Card, Col, Empty, Row, Typography } from 'antd';
import Link from 'next/link';
import { useMemo } from 'react';
import styled from 'styled-components';

import { DoubleRightOutlined, PlusOutlined } from '@ant-design/icons';
import { FacilityItemCmp } from '@components/CompanyItem';

const ColStyle = styled(Col)``;

const ListStyle = styled(Row)`
  ${ColStyle} {
    margin-bottom: 16px;
  }
`;

const HeadingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  margin-top: 32px;
`;

const LinkRow = styled.div`
  text-align: right;
`;

interface Props {
  data: CompanyType[];
  heading: string;
  className?: string;
  type?: string;
  max?: number;
  viewAllLink?: string;
}

export function CompanyList(props: Props) {
  const listData = useMemo(() => {
    if (!props.max) return props.data;

    return props.data.slice(0, props.max);
  }, [props.data, props.max]);

  return (
    <Wrapper className={props.className}>
      <HeadingRow>
        <Typography.Title style={{ marginBottom: 0 }} level={4}>
          {props.heading}
        </Typography.Title>
        <Link href={`/admin/${props.type}/add`}>
          <Button icon={<PlusOutlined />}>Add</Button>
        </Link>
      </HeadingRow>
      {listData.length > 0 && (
        <ListStyle gutter={16} style={{ marginTop: 16 }}>
          {listData.map((item) => (
            <ColStyle key={item.id} md={6}>
              <FacilityItemCmp data={item} />
            </ColStyle>
          ))}
        </ListStyle>
      )}

      {listData.length === 0 && (
        <Card style={{ marginTop: 16 }}>
          <Empty />
        </Card>
      )}
      {props.max && props.data.length > props.max && props.viewAllLink && (
        <LinkRow>
          <Link data-testid="view-all" href={props.viewAllLink}>
            View all <DoubleRightOutlined />
          </Link>
        </LinkRow>
      )}
    </Wrapper>
  );
}
