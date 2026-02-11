import ExpoPipSubtitleModule from './ExpoPipSubtitleModule';

export function startPiP(text: string): string {
  return ExpoPipSubtitleModule.startPiP(text);
}

export function updateText(text: string): string {
  return ExpoPipSubtitleModule.updateText(text);
}

export function stopPiP(): string {
  return ExpoPipSubtitleModule.stopPiP();
}
