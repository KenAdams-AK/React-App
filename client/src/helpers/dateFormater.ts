export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };

  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}
