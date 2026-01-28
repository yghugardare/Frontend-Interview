export function formatDate(dateString: string, format: "long" | "short" = "long"): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: format === "long" ? "long" : "short",
    day: "numeric",
  });
}

export function getReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}
