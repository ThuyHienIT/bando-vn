import dayjs from 'dayjs';
import { memo, useCallback } from 'react';
import styled, { css } from 'styled-components';

const SlotStyle = styled.small<{ disabled?: boolean }>`
  background-color: ${(p) => (!p.disabled ? '#509f53' : '#dddddd')};
  color: ${(p) => (!p.disabled ? '#ffffff' : '#333333')};
  border-radius: 2px;
  display: block;
  position: absolute;
  padding: 2px;
  width: 80%;
  z-index: 1;
  ${(p) =>
    !p.disabled &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    `}
`;

interface Props {
  data: BookingItem;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?(item: BookingItem): void;
}
export const BookedSlot = memo<Props>(function BookedSlot({
  onClick,
  ...props
}) {
  const fromDayjs = dayjs(props.data.from);
  const toDayjs = dayjs(props.data.to);

  const handleClick = useCallback<React.MouseEventHandler>(
    (e) => {
      e.stopPropagation();
      onClick?.(props.data);
    },
    [onClick, props.data]
  );

  return (
    <SlotStyle
      key={props.data.id}
      style={{
        top: timeToPosition(fromDayjs.format('HH:mm'), 40),
        height: durationToHeight(toDayjs.diff(fromDayjs, 'minute')),
      }}
      disabled={props.disabled}
      onClick={handleClick}
    >
      Booked
    </SlotStyle>
  );
});

/**
 * Convert position in pixels to time
 * @param pos number position of mouse
 * @param gap hour gap in pixels
 * @returns [hour: number, min: number]
 */
export function positionToTime(pos: number, hourGap: number = 40) {
  const val = pos / hourGap;
  const hour = Math.floor(val);
  return [hour, val - hour >= 0.5 ? 30 : 0];
}

/**
 * Convert Time to position
 * @param time string [hh:mm]
 * @param hourGap: number in pixels
 */
export function timeToPosition(time: string, hourGap: number = 40) {
  const [hour, min] = time.split(':').map((i) => parseInt(i, 10));
  return hour * hourGap + (min / 60) * hourGap;
}

/**
 *
 * @param duration number in minutes
 * @param hourGap number pixels per hour
 */
export function durationToHeight(duration: number, hourGap: number = 40) {
  return (duration * hourGap) / 60;
}
