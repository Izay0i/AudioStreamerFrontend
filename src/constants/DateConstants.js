export const sysLocale = Intl.DateTimeFormat().resolvedOptions().locale;

export const dateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};