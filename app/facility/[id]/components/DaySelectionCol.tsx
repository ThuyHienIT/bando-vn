'use client';

import dayjs, { Dayjs } from 'dayjs';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';

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
  occupiedSlots?: [string, string][];
  operationHours?: [string, string];

  onClick?([from, to]: [Dayjs, Dayjs]): void;
}

function disabledClick(e: React.MouseEvent) {
  e.stopPropagation();
}
export const DaySelectionCol = memo(function DaySelectionCol(props: Props) {
  const scrollerRef = useRef<HTMLDivElement>();

  const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (!scrollerRef.current) return;

      const containerTop = scrollerRef.current.getBoundingClientRect().y;
      const containerScrollTop = scrollerRef.current?.scrollTop;

      const pos = e.clientY - containerTop + containerScrollTop;
      const [hour, min] = positionToTime(pos, 40);
      const from = props.date.clone().set('second', 0).set('hour', hour).set('minute', min);

      props.onClick?.([from, from.clone().add(30, 'minute')]);
    },
    [props]
  );

  const occupiedSlots = useMemo(() => {
    return props.occupiedSlots?.map(([from, to]) => {
      if (!props.date.isSame(from, 'date')) return <></>;

      const fromDayjs = dayjs(from);
      const toDayjs = dayjs(to);

      return (
        <SlotStyle
          key={from + to}
          style={{
            top: timeToPosition(fromDayjs.format('HH:mm'), 40),
            height: durationToHeight(toDayjs.diff(fromDayjs, 'minute')),
          }}
          onClick={disabledClick}
        >
          Booked
        </SlotStyle>
      );
    });
  }, [props.date, props.occupiedSlots]);

  const notWorkingSlots = useMemo(() => {
    if (!props.operationHours || props.disabled) return null;

    const [fromStr, toStr] = props.operationHours;

    const fromMin = dayjs(fromStr, 'HH:mm').diff(dayjs('00:00', 'HH:mm'), 'minute');
    const toMin = dayjs('23:59', 'HH:mm').diff(dayjs(toStr, 'HH:mm'), 'minute');

    return (
      <>
        <NotWorkingBox
          style={{
            top: 0,
            height: durationToHeight(fromMin),
          }}
          onClick={disabledClick}
        />
        <NotWorkingBox
          style={{
            top: timeToPosition(toStr, 40),
            height: durationToHeight(toMin),
          }}
          onClick={disabledClick}
        />
      </>
    );
  }, [props.operationHours]);

  useEffect(() => {
    const scroller = document.getElementById('js-weekview-container') as HTMLDivElement;
    scrollerRef.current = scroller;
  }, []);

  return (
    <ColStyle
      $disabled={props.disabled}
      className={props.className}
      onClick={props.disabled ? undefined : handleClick}
    >
      <div role="presentation">
        {occupiedSlots}
        {notWorkingSlots}
      </div>
    </ColStyle>
  );
});

/**
 * Convert position in pixels to time
 * @param pos number position of mouse
 * @param gap hour gap in pixels
 * @returns [hour: number, min: number]
 */
function positionToTime(pos: number, hourGap: number = 40) {
  const val = pos / hourGap;
  const hour = Math.floor(val);
  return [hour, val - hour >= 0.5 ? 30 : 0];
}

/**
 * Convert Time to position
 * @param time string [hh:mm]
 * @param hourGap: number in pixels
 */
function timeToPosition(time: string, hourGap: number = 40) {
  const [hour, min] = time.split(':').map((i) => parseInt(i, 10));
  return hour * hourGap + (min / 60) * hourGap;
}

/**
 *
 * @param duration number in minutes
 * @param hourGap number pixels per hour
 */
function durationToHeight(duration: number, hourGap: number = 40) {
  return (duration * hourGap) / 60;
}
