export function getReadingTime(text?: string) {
  if (!text) return null;

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
}
