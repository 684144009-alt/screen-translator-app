import * as React from 'react';

import { cd TranslateAppViewProps } from './cd TranslateApp.types';

export default function cd TranslateAppView(props: cd TranslateAppViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
