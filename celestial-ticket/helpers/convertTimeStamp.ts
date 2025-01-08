/**
 * Formats a timestamp into a "HH:MM" string.
 * @param timestamp - The timestamp in milliseconds.
 * @returns A formatted time string.
 */
export function formatTime(timestamp: number): string {
  const date = new Date(+timestamp);
  // console.log(date, timestamp);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatIndoDate(timestamp: number): string {
  return new Date(Number(timestamp)).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
