'use client';

import { memo, useMemo } from 'react';
import styled from 'styled-components';

const TimeLine = styled.div`
  border-top: 1px solid #dddddd;
  height: 40px;
  &:last-child {
    border-bottom: 1px solid #dddddd;
  }
`;

const TimeText = styled.small`
  color: #8d8d8d;
  display: inline-block;
  position: relative;
  top: -10px;
  background: #fff;
  padding-right: 4px;
`;

interface Props {
  className?: string;
  operationHours?: [string, string][];
}

export const LineCol = memo<Props>(function TimeCol(props) {
  const [from, to] = useMemo(() => [9.5, 17], []);
  return (
    <div className={props.className}>
      {Array.from({ length: 24 }).map((_, idx) => (
        <TimeLine key={idx}></TimeLine>
      ))}
    </div>
  );
});
