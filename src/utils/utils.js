export function formatDate(date) {
  const formatter = new Intl.DateTimeFormat(navigator.language || "eu", {
    month: "short",
    year: "numeric",
    day: "2-digit",
  });

  const dateObj = new Date(date);
  return formatter.format(dateObj);
}

export function getDueDate(date, terms) {
  const futureTime = +terms * 24 * 60 * 60 * 1000;

  const dateTime = new Date(date).getTime();

  const newDate = formatDate(futureTime + dateTime);

  return newDate;
}
