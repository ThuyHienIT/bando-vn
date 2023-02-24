'use client';

import dayjs, { Dayjs } from 'dayjs';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';

import {
  BookedSlot,
  durationToHeight,
  positionToTime,
  timeToPosition,
} from './BookedSlot';

const ColStyle = styled.div<{ $disabled?: boolean }>`
  width: 80px;
  min-width: 80px;
  flex: 1 1 0%;
  border-right: 1px solid #dddddd;
  position: relative;

  ${(p) =>
    p.$disabled &&
    css`
      background-color: rgba(0, 0, 0, 0.05);
    `}
`;

const SlotStyle = styled.small`
  background-color: #509f53;
  border-radius: 2px;
  display: block;
  position: absolute;
  padding: 2px;
  color: #ffffff;
  width: 80%;
  z-index: 1;
`;

const NotWorkingBox = styled.small`
  background-color: rgba(0, 0, 0, 0.05);
  display: block;
  position: absolute;
  width: 100%;
`;

interface Props {
  className?: string;
  date: Dayjs;
  disabled?: boolean;
  disabledSlots?: [string, string][];
  operationHours?: [string, string];
  occupiedSlots?: BookingItem[];
  onEdit?(item: BookingItem): void;
  onClick?([from, to]: [Dayjs, Dayjs]): void;
}

function disabledClick(e: React.MouseEvent) {
  e.stopPropagation();
}
export const DaySelectionCol = memo(function DaySelectionCol({
  onEdit,
  ...props
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>();

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (!scrollerRef.current) return;

      const containerTop = scrollerRef.current.getBoundingClientRect().y;
      const containerScrollTop = scrollerRef.current?.scrollTop;

      const pos = e.clientY - containerTop + containerScrollTop;
      const [hour, min] = positionToTime(pos, 40);
      const from = props.date
        .clone()
        .set('second', 0)
        .set('hour', hour)
        .set('minute', min);

      props.onClick?.([from, from.clone().add(30, 'minute')]);
    },
    [props]
  );

  const occupiedSlots = useMemo(() => {
    return props.occupiedSlots
      ?.filter((item) => props.date.isSame(item.from, 'date'))
      .map((item) => {
        return <BookedSlot key={item.id} data={item} onClick={onEdit} />;
      });
  }, [props.date, props.occupiedSlots, onEdit]);

  const notWorkingSlots = useMemo(() => {
    if (!props.operationHours || props.disabled) return null;

    const [fromStr, toStr] = props.operationHours;
    let fromDayjs = dayjs(fromStr, 'HH:mm');
    const now = dayjs();
    if (now.isSame(props.date, 'date') && now.isAfter(fromDayjs)) {
      fromDayjs = now;
    }

    const fromMin = fromDayjs.diff(dayjs('00:00', 'HH:mm'), 'minute');

    const toMin = dayjs('23:59', 'HH:mm').diff(dayjs(toStr, 'HH:mm'), 'minute');

    return (
      <>
        <NotWorkingBox
          key="morning"
          style={{
            top: 0,
            height: durationToHeight(fromMin),
          }}
          onClick={disabledClick}
        />
        <NotWorkingBox
          key="evening"
          style={{
            top: timeToPosition(toStr, 40),
            height: durationToHeight(toMin),
          }}
          onClick={disabledClick}
        />
      </>
    );
  }, [props.disabled, props.operationHours]);

  useEffect(() => {
    const scroller = document.getElementById(
      'js-weekview-container'
    ) as HTMLDivElement;
    scrollerRef.current = scroller;
  }, []);

  return (
    <ColStyle
      $disabled={props.disabled}
      className={props.className}
      onClick={props.disabled ? undefined : handleClick}
      data-testid="click-to-book"
    >
      <div role="presentation">
        {occupiedSlots}
        {notWorkingSlots}
      </div>
    </ColStyle>
  );
});
