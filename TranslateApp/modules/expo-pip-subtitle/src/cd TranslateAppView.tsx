import { requireNativeView } from 'expo';
import * as React from 'react';

import { cd TranslateAppViewProps } from './cd TranslateApp.types';

const NativeView: React.ComponentType<cd TranslateAppViewProps> =
  requireNativeView('cd TranslateApp');

export default function cd TranslateAppView(props: cd TranslateAppViewProps) {
  return <NativeView {...props} />;
}
