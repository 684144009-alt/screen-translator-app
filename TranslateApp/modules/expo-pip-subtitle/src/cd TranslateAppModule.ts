import { NativeModule, requireNativeModule } from 'expo';

import { cd TranslateAppModuleEvents } from './cd TranslateApp.types';

declare class cd TranslateAppModule extends NativeModule<cd TranslateAppModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<cd TranslateAppModule>('cd TranslateApp');
