'use client';

import { Typography } from 'antd';
import { memo } from 'react';
import styled from 'styled-components';

const MonthLabel = styled(Typography.Text)`
  text-transform: uppercase;
`;

const DateLabel = styled.h2`
  font-size: 40px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const HeadingStyle = styled.div`
  text-align: center;
  color: #333;
`;

interface Props {
  className?: string;
  day: string;
  date: number;
}

export const DayHeadingCol = memo(function DayHeadingCol(props: Props) {
  return (
    <HeadingStyle className={props.className}>
      <MonthLabel type="secondary">{props.day}</MonthLabel>
      <DateLabel>{`0${props.date}`.slice(-2)}</DateLabel>
    </HeadingStyle>
  );
});
