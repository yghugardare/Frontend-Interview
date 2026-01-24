// Helper function for date formatting
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.abs(now.getTime() - date.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
