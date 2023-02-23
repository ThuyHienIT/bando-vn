'use client';

import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { BookingModal } from './BookingModal';
import { DayHeadingCol } from './DayHeadingCol';
import { DaySelectionCol } from './DaySelectionCol';
import { LineCol } from './LineCol';
import { TimeCol } from './TimeCol';

const DayHeadingColStyle = styled(DayHeadingCol)``;
const DaySelectionColStyle = styled(DaySelectionCol)`
  &:first-child {
    border-left: 1px solid #dddddd;
  }
`;
const Wrapper = styled.div`
  display: flex;
  gap: 4px;

  ${DaySelectionColStyle},
  ${DayHeadingColStyle} {
    flex: 1 1 0%;
  }
`;

const TimeColStyle = styled.small`
  > span {
    visibility: hidden;
  }
`;

const DateSelectionScroller = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

const DateSelectionContent = styled.div`
  position: relative;
  flex-grow: 1;
`;

const DateSelection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
`;

const TimeDatesContainer = styled.div`
  display: flex;
`;

interface Props {
  data: FacilityItem;
  selectedDate?: Dayjs;
  occupiedSlots?: BookingItem[];
  onBooked?(item: BookingItem): void;
  onCancalled?(bookingId: string): void;
}

export function WeekView({ onBooked, onCancalled, ...props }: Props) {
  const [opened, setOpened] = useState(false);
  const [from, setFrom] = useState<Dayjs>();
  const [to, setTo] = useState<Dayjs>();
  const [editingBooking, setEditingBooking] = useState<BookingItem>();

  const handleClose = useCallback(() => {
    setOpened(false);
    setFrom(undefined);
    setTo(undefined);
  }, []);

  const days = useMemo(() => {
    const today = props.selectedDate || dayjs();
    const firstDate = today.date() - today.day();

    return Array.from({ length: 7 }).map((_, idx) =>
      today.clone().set('date', firstDate + idx)
    );
  }, [props.selectedDate]);

  const handleSlotClick = useCallback(([from, to]: [Dayjs, Dayjs]) => {
    setFrom(from);
    setTo(to);
    setOpened(true);
  }, []);

  const handleBooked = useCallback(
    (item: BookingItem) => {
      onBooked?.(item);
      setOpened(false);
      setEditingBooking(undefined);
      setFrom(undefined);
      setTo(undefined);
    },
    [onBooked]
  );

  const handleEdit = useCallback((booking: BookingItem) => {
    setEditingBooking(booking);
    setFrom(dayjs(booking.from));
    setTo(dayjs(booking.to));
    setOpened(true);
  }, []);

  const handleCancelled = useCallback(
    (bookingId: string) => {
      onCancalled?.(bookingId);
      setOpened(false);
      setEditingBooking(undefined);
      setFrom(undefined);
      setTo(undefined);
    },
    [onCancalled]
  );

  return (
    <>
      <Wrapper>
        <TimeColStyle>
          <span>00:00</span>
        </TimeColStyle>
        {days.map((d) => (
          <DayHeadingColStyle
            key={d.toString()}
            day={d.format('ddd')}
            date={d.date()}
          />
        ))}
      </Wrapper>

      <DateSelectionScroller id="js-weekview-container" data-testid="scroller">
        <TimeDatesContainer>
          <TimeCol />
          <DateSelectionContent>
            <LineCol />
            <DateSelection>
              {days.map((d) => (
                <DaySelectionColStyle
                  key={d.toString()}
                  date={d.clone()}
                  disabled={d.isBefore(dayjs(), 'date')}
                  onClick={handleSlotClick}
                  onEdit={handleEdit}
                  occupiedSlots={props.occupiedSlots}
                  operationHours={props.data.operationHours}
                />
              ))}
            </DateSelection>
          </DateSelectionContent>
        </TimeDatesContainer>
      </DateSelectionScroller>

      <BookingModal
        opened={opened}
        onClose={handleClose}
        from={from}
        to={to}
        data={props.data}
        onDone={handleBooked}
        bookingId={editingBooking?.id}
        isUpdate={Boolean(editingBooking?.id)}
        onCancelled={handleCancelled}
      />
    </>
  );
}
