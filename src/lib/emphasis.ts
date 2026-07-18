const EMPHASIS_PATTERN = /\*([^*]+)\*/g;

export function renderEmphasis(text: string): string {
  return text.replace(EMPHASIS_PATTERN, '<em>$1</em>');
}

export function stripEmphasis(text: string): string {
  return text.replace(EMPHASIS_PATTERN, '$1');
}
