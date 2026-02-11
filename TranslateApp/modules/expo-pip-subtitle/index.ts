// Reexport the native module. On web, it will be resolved to cd TranslateAppModule.web.ts
// and on native platforms to cd TranslateAppModule.ts
export { default } from './src/cd TranslateAppModule';
export { default as cd TranslateAppView } from './src/cd TranslateAppView';
export * from  './src/cd TranslateApp.types';
