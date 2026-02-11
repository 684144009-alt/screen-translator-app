import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './cd TranslateApp.types';

type cd TranslateAppModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class cd TranslateAppModule extends NativeModule<cd TranslateAppModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(cd TranslateAppModule, 'cd TranslateAppModule');
