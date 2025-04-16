import { DatePipe } from "@angular/common";

export function parseDate(value: any): Date | null {
  if ((typeof value === 'string') && (value.includes('/'))) {
    const str = value.split('/');

    const year = Number(str[2]);
    const month = Number(str[1]) - 1;
    const date = Number(str[0]);

    return new Date(year, month, date);
  } else if ((typeof value === 'string') && value === '') {
    return new Date();
  }
  const timestamp = typeof value === 'number' ? value : Date.parse(value);
  return isNaN(timestamp) ? null : new Date(timestamp);
}

export function setDateFormat(value: Date, datepipe: DatePipe, format: string = 'yyyy-MM-dd') {
  const date = value ? parseDate(value) : new Date();
  return datepipe.transform(date, format);
}

export function convertToDate(dateString: string) {
  const newData = dateString.replace(/(\d+[/])(\d+[/])/, '$2$1');
  const date = new Date(newData);
  return date
}
