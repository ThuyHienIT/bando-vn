'use client';

// https://github.com/vercel/next.js/issues/44125#issuecomment-1372270391
import { useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

export function AntdStyleRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => createCache());

  const render = <>{children}</>;

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  if (typeof window !== 'undefined') {
    return render;
  }

  return <StyleProvider cache={cache}>{render}</StyleProvider>;
}
