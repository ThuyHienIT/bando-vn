'use client';

import { Calendar } from 'antd';
import { Dayjs } from 'dayjs';
import styled from 'styled-components';

const CalendarContainer = styled(Calendar)`
  border: 1px solid #dddddd;

  .ant-picker-content tr:has(.ant-picker-cell-selected) {
    position: relative;
    background-color: #e9feea;
  }
`;

interface Props {
  defaultValue?: Dayjs;
  onChange?(date: Dayjs): void;
}

export function MonthCalendar(props: Props) {
  return (
    <CalendarContainer
      defaultValue={props.defaultValue}
      fullscreen={false}
      onChange={props.onChange}
    />
  );
}
