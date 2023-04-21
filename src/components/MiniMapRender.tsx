import dynamic from 'next/dynamic';
import { forwardRef } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import { MiniMapParams, MiniMapProps } from './MiniMap';
import { Overlay } from './Overlay';

const MiniMap = dynamic(() => import('./MiniMap'), {
  loading: () => (
    <Overlay>
      <LoadingOutlined />
    </Overlay>
  ),
  ssr: false,
});

export const MiniMapRenderer = forwardRef<
  MiniMapParams,
  Omit<MiniMapProps, 'forwardedRef'>
>((props, ref) => {
  return <MiniMap {...props} forwardedRef={ref} />;
});
