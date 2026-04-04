const POLISH_MONTHS: string[] = [
  "Styczeń", "Luty", "Marzec", "Kwiecień",
  "Maj", "Czerwiec", "Lipiec", "Sierpień",
  "Wrzesień", "Październik", "Listopad", "Grudzień",
];

export interface DateInfo {
  day: number;
  month: string;
  year: number;
  ariaLabel: string;
}

export function getDateInfo(daysFromToday: number): DateInfo {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);

  const day = date.getDate();
  const month = POLISH_MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return { day, month, year, ariaLabel: `${day} ${month} ${year}` };
}
