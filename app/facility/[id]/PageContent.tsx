'use client';

import { Col, Row, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import {
  CalendarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { FacilityTypeEnum } from '@enums';

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

const ImageStyle = styled(Image)`
  width: 100%;
  height: auto;
`;
const CalendarCol = styled(Col)`
  && {
    overflow: hidden;
  }
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DesWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  margin-top: 24px;
`;

interface Props {
  data: FacilityItem;
  occupiedSlots?: BookingItem[];
}

export function PageContent(props: Props) {
  const [occupiedSlots, setOccupiedSlots] = useState(props.occupiedSlots);
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
        <CalendarCol md={8}>
          <MonthCalendar
            defaultValue={selectedDate}
            onChange={setSelectedDate}
          />
          <DesWrapper>
            {props.data.thumbnail && (
              <ImageStyle
                src={props.data.thumbnail}
                alt={props.data.name}
                width={250}
                height={100}
              />
            )}
            <Typography.Title level={5} style={{ marginTop: 32 }}>
              About this{' '}
              {props.data.type === FacilityTypeEnum.Room ? 'room' : 'facility'}:
            </Typography.Title>
            <Typography.Paragraph>
              <EnvironmentOutlined /> {props.data.address}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <PhoneOutlined />{' '}
              <a href={`tel:${props.data.phoneNumber}`}>
                {props.data.phoneNumber}
              </a>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <CalendarOutlined />{' '}
              <span>{props.data.operationHours?.join(' - ')}</span>
            </Typography.Paragraph>
            <Typography.Paragraph>{props.data.amenities}</Typography.Paragraph>
          </DesWrapper>
        </CalendarCol>
        <WeekViewContainer md={16}>
          <WeekView
            selectedDate={selectedDate}
            data={props.data}
            occupiedSlots={occupiedSlots}
            onBooked={handleBooked}
            onCancalled={handleCancelled}
          />
        </WeekViewContainer>
      </CalendarContainer>
    </>
  );
}
