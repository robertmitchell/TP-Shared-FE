import { addMonths, format, isDate, isValid, parseISO } from 'date-fns'

type FormatDateOptions = Parameters<typeof format>['2']

type FormatDateOptionsWithPattern = FormatDateOptions & {
  pattern: string
}

const formatDateOptionsInitialValue: FormatDateOptionsWithPattern = {
  pattern: 'MM/dd/yyyy',
}

/**
 * Returns a booleean for whether or not the date has passed
 */
export const hasDatePassed = (date: string | Date): boolean => {
  if (date === '') {
    return false
  }

  const today = new Date()

  return formatDate(date) < formatDate(today)
}

/**
 * formatDate parses date strings using parseISO if the date matches ISO_8601 standards,
 * if not, it falls back to Date.parse.
 * Parsing dattese using datee constructor or Date.parse is discouraged by MDN:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#timestamp_string
 */
export const formatDate = (
  date: string | Date,
  options: FormatDateOptionsWithPattern = formatDateOptionsInitialValue,
): string => {
  if (date === '') {
    return ''
  }

  const { pattern, ...rest } = options

  if (typeof date === 'string') {
    const parsedIsoDate = parseISO(date)
    if (isValid(parsedIsoDate)) {
      return format(parsedIsoDate, pattern, rest)
    }

    const parsedDate = Date.parse(date)
    if (isValid(parsedDate)) {
      return format(parsedDate, pattern, rest)
    }
  } else if (isDate(date)) {
    return format(date, pattern, rest)
  }

  return ''
}

/**
 * September 11, 2001
 */
export const formatFullDate = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'MMMM dd, yyyy' })
}

/**
 * 09/11/2001
 */
export const formatWithLocal = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'P' })
}

/**
 * 09/11/2001, 9:45 p.m. (-7:00 GMT)
 */
export const formatWithTimezoneGMT = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, {
    ...options,
    pattern: "MM/dd/yyyy, h:mm aaaa '('xxx 'GMT)'",
  })
}

/**
 * Sep 11 '01
 */
export const formatShortWithApostrophe = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: "MMM d ''yyy" })
}

/**
 * Sep 11, 2001
 */
export const formatShortMonth = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'MMM d, yyyy' })
}

/**
 * 09/2001
 */
export const formatMonthYear = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'MM/yyyy' })
}

/**
 * 2001/09/11 21:45:16
 */
export const formatDateTime = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'yyyy/MM/dd HH:mm:ss' })
}

/**
 * 2001-09-11 21:45:16
 */
export const formatDateDashTime = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'yyyy-MM-dd HH:mm:ss' })
}

/**
 * 9:45pm
 */
export const formatTime = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'h:mmaaa' })
}

/**
 * Wednesday
 */
export const formatWeekday = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'EEEE' })
}

/**
 * Wednesday September 11
 */
export const formatWeekdayPlusDate = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'EEEE MMMM dd' })
}

/**
 * 2001/09/11
 */
export const formatDateYearFirst = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'yyyy/MM/dd' })
}

/**
 * -7:00
 */
export const getTimezoneOffset = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'XXX' })
}

/**
 * formatTimeWithSeconds("2001-09-11 21:45:16") => 9:45:16
 */
export const formatTimeWithSeconds = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'h:mm:ss' })
}

/**
 * September 11th 2001, 9:45 PM
 */
export const formatLongDate = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'MMMM do yyyy, h:mm a' })
}

/**
 * Formats a Date object to a string like "September 11th, 2001"
 */
export const formatDatePlusOneMonth = (
  date: string | Date,
  options?: FormatDateOptions,
): ReturnType<typeof formatDate> => {
  return formatDate(date, { ...options, pattern: 'MMM do, yyyy' })
}

/**
 * Formats a Date object to a string like "September 11, 2001"
 */
export const formatDatePlusMonths = (
  date: Date,
  months: number,
): ReturnType<typeof formatDate> => formatFullDate(addMonths(date, months))
