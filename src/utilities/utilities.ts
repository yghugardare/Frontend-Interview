// TIME FORMATTING FUNCTION
export const timeFormatter = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  // Validate date
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(Math.abs(diffInMs) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const timeUnits: Array<{
    unit: Intl.RelativeTimeFormatUnit;
    seconds: number;
  }> = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of timeUnits) {
    const count = Math.floor(diffInSeconds / seconds);
    if (count >= 1) {
      return rtf.format(diffInMs > 0 ? -count : count, unit);
    }
  }

  return "just now";
};
