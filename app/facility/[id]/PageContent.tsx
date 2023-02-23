'use client';

import { Col, Row, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { MonthCalendar } from './components/MonthCalendar';
import { WeekView } from './components/WeekView';

const CalendarContainer = styled(Row)`
  flex-grow: 1;
  overflow: hidden;
`;

const WeekViewContainer = styled(Col)`
  && {
    display: flex;
  }
  flex-direction: column;
  height: 100%;
`;

interface Props {
  data: FacilityItem;
  occupiedSlots?: [string, string][];
  occupiedSlots2?: BookingItem[];
}

export function PageContent(props: Props) {
  const [occupiedSlots, setOccupiedSlots] = useState(props.occupiedSlots2);
  const [selectedDate, setSelectedDate] = useState<Dayjs>();

  const handleBooked = useCallback((item: BookingItem) => {
    setOccupiedSlots((slots) => {
      if (!slots) return [item];

      const idx = slots?.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        slots.splice(idx, 1, item);
        return slots;
      }

      return [...slots, item];
    });
  }, []);

  const handleCancelled = useCallback((bookingId: string) => {
    setOccupiedSlots((slots) => {
      if (!slots) return [];

      return slots?.filter((i) => i.id !== bookingId);
    });
  }, []);

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
            // occupiedSlots={occupiedSlots}
            occupiedSlots2={occupiedSlots}
            onBooked={handleBooked}
            onCancalled={handleCancelled}
          />
        </WeekViewContainer>
      </CalendarContainer>
    </>
  );
}
