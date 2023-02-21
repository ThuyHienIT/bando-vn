'use client';

import { Col, Row, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';

import { MonthCalendar } from './components/MonthCalendar';
import { WeekView } from './components/WeekView';

const CalendarContainer = styled(Row)`
  flex-grow: 1;
  overflow: hidden;
`;

const WeekViewContainer = styled(Col)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface Props {
  data: FacilityItem;
  occupiedSlots?: [string, string][];
}

export function PageContent(props: Props) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>();

  return (
    <>
      <Typography.Title style={{ marginTop: 32 }} level={3}>
        {props.data.name}
      </Typography.Title>
      <CalendarContainer gutter={16}>
        <Col md={8}>
          <MonthCalendar
            defaultValue={selectedDate}
            onChange={setSelectedDate}
          />
          <Typography.Title level={5} style={{ marginTop: 32 }}>
            About this facility:
          </Typography.Title>
          <Typography.Paragraph>{props.data.description}</Typography.Paragraph>
        </Col>
        <WeekViewContainer md={16}>
          <WeekView
            selectedDate={selectedDate}
            data={props.data}
            disabledSlots={props.occupiedSlots}
          />
        </WeekViewContainer>
      </CalendarContainer>
    </>
  );
}
