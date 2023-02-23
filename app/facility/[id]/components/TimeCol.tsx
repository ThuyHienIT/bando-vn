'use client';

import { memo } from 'react';
import styled from 'styled-components';

const TimeLine = styled.div`
  height: 40px;
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
}

export const TimeCol = memo<Props>(function TimeCol(props) {
  return (
    <div className={props.className}>
      {Array.from({ length: 24 }).map((_, idx) => (
        <TimeLine key={idx}>
          <TimeText>{idx ? `0${idx}:00`.slice(-5) : ''}</TimeText>
        </TimeLine>
      ))}
    </div>
  );
});
