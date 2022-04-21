import { addDays, getToday } from "@/services/dates";

export const DefaultDateTimeFormats: Record<string, Intl.DateTimeFormatOptions> = {
  d: { year: "numeric", month: "2-digit", day: "2-digit" },
  D: { year: "numeric", month: "2-digit", day: "2-digit", weekday: "long" },
  e: { year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" },
  E: { year: "numeric", month: "2-digit", day: "2-digit", weekday: "short", hour: "2-digit", minute: "2-digit" },
  f: { year: "numeric", month: "2-digit", day: "2-digit", weekday: "long", hour: "2-digit", minute: "2-digit" },
  F: { year: "numeric", month: "2-digit", day: "2-digit", weekday: "long", hour: "2-digit", minute: "2-digit", second: "2-digit" },
  g: { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" },
  G: { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" },
  t: { hour: "2-digit", minute: "2-digit" },
  T: { hour: "2-digit", minute: "2-digit", second: "2-digit" }
};

const dateTimeFormats: Record<string, Intl.DateTimeFormat> = {};
const dateTimeFormatters: Record<string, Formatter> = {};
const dateTimeParsers: Record<string, Parser> = {};
const dateTimeTokens: Record<string, DateTimeToken[]> = {};

export function getDateTimeFormatter(locale: string, formatStr: string) {
  const key = `${locale};${formatStr}`;
  
  let formatter: Formatter = dateTimeFormatters[key];
  if (!formatter) {
    formatter = (value: Date) => {
      if (value == void (0)) {
        return null;
      }

      const dateTimeFormat = getDateTimeFormatEx(locale, formatStr);
      return dateTimeFormat.format(value);     
    };

    dateTimeFormatters[key] = formatter;
  }

  return formatter;
}
export function getDateTimeParser(locale: string, formatStr: string) {
  const key = `${locale};${formatStr}`;
  
  let parser: Parser = dateTimeParsers[key];
  if (!parser) {
    parser = (value: string) => {
      if (value == void (0)) {
        return null;
      }

      if (value == " ") {
        return getToday();
      } else if (value.startsWith("+")) {
        const c = value.substring(1);
        if (isInteger(c)) {
          return addDays(getToday(), parseInt(c));
        }
      } else if (value.startsWith("-")) {
        const c = value.substring(1);
        if (isInteger(c)) {
          return addDays(getToday(), -parseInt(c));
        }
      }

      const dateTimeFormat = getDateTimeFormatEx(locale, formatStr);
      const tokens = getDateTimeTokens(key, dateTimeFormat);

      const date: any = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        am: ""
      };

      let checkVal = value;

      const getTokenValue = (token: DateTimeToken) => {
        let r = "";
        for (let i = 0; i < checkVal.length && i < token.length; i++) {
          const c = checkVal.substring(i, i + 1);

          if (!isInteger(c)) {
            if (token.type == "am") {
              const c2 = checkVal.substring(0, 2).toLowerCase();
              if (["am", "pm"].includes(c2)) {
                return c2.toLowerCase()
              }
            } else if (i === 0) {
              checkVal = checkVal.substring(1);
              i--;
              continue;
            }

            return r;
          }

          r += c;
        }

        return r;
      }

      for (const token of tokens) {
        let tokenValue: string | number = getTokenValue(token);
        if (checkVal === "") {
          break;
        }

        checkVal = checkVal.substring(tokenValue.length);

        if (token.type === "year" && tokenValue.length === 2) {
          const year = parseInt(tokenValue);
          if (year > 50) {
            tokenValue = `19${tokenValue}`;
          } else {
            tokenValue = `20${tokenValue}`;
          }
        }

        if (token.type !== "am") {
          tokenValue = parseInt(tokenValue);
        }

        date[token.type] = tokenValue;
      }

      if (date.year === 0) {
        date.year = new Date().getFullYear();
      }
      if (date.month === 0) {
        date.month = new Date().getMonth() + 1;
      }
      if (date.day === 0) {
        date.day = new Date().getDate();
      }
      if (date.am == "pm") {
        date.hour = date.hour + 12;
      }

      return new Date(date.year, date.month - 1, date.day, date.hour, date.minute, date.second);
    };

    dateTimeParsers[formatStr] = parser;
  }

  return parser;
}
export function getDateTimeFormatterParser(locale: string, formatStr: string) {
  return {
    formatter: getDateTimeFormatter(locale, formatStr),
    parser: getDateTimeParser(locale, formatStr)
  };
}
export function getDateTimeFormat(locale: string, formatStr: string) {
  return DefaultDateTimeFormats[formatStr];
}
function getDateTimeFormatEx(locale: string, formatStr: string) {
  const key = `${locale};${formatStr}`;
  
  let format = dateTimeFormats[key];
  if (!format) {
    format = Intl.DateTimeFormat(locale, DefaultDateTimeFormats[formatStr]);
    dateTimeFormats[key] = format;
  }
  
  return format;
}
function getDateTimeTokens(key: string, dtFormat: Intl.DateTimeFormat) {
  let tokens = dateTimeTokens[key];
  if (!tokens) {
    let s = dtFormat.format(new Date(1999, 8, 7, 6, 5, 4));

    tokens = [];
    while (s.length > 0) {
      if (s.substring(0, 4) == "1999") {
        tokens.push({type: "year", length: 4});
      } else if (s.substring(0, 2) == "99") {
        tokens.push({type: "year", length: 4});
      } else if (s.substring(0, 2) == "09") {
        tokens.push({type: "month", length: 2});
      } else if (s.substring(0, 1) == "9") {
        tokens.push({type: "month", length: 2});
      } else if (s.substring(0, 2) == "07") {
        tokens.push({type: "day", length: 2});
      } else if (s.substring(0, 1) == "7") {
        tokens.push({type: "day", length: 2});
      } else if (s.substring(0, 2) == "06") {
        tokens.push({type: "hour", length: 2});
      } else if (s.substring(0, 1) == "6") {
        tokens.push({type: "hour", length: 2});
      } else if (s.substring(0, 2) == "05") {
        tokens.push({type: "minute", length: 2});
      } else if (s.substring(0, 1) == "5") {
        tokens.push({type: "minute", length: 2});
      } else if (s.substring(0, 2) == "05") {
        tokens.push({type: "second", length: 2});
      } else if (s.substring(0, 1) == "05") {
        tokens.push({type: "second", length: 2});
      } else if (s.substring(0, 2).toLowerCase() == "am") {
        tokens.push({type: "am", length: 2});
      } else {
        s = s.substring(1);
        continue;
      }

      s = s.substring(tokens[tokens.length - 1].length);
    }
    
    dateTimeTokens[key] = tokens;
  }
  
  return tokens;
}

export const DefaultNumberFormats: Record<string, Intl.NumberFormatOptions> = {
  "f": { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 4 },
  "f0": { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 0 },
  "f1": { style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1 },
  "f2": { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 },
  "f3": { style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3 },
  "f4": { style: "decimal", minimumFractionDigits: 4, maximumFractionDigits: 4 },
  "n": { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 4 },
  "n0": { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true },
  "n1": { style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1, useGrouping: true },
  "n2": { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true },
  "n3": { style: "decimal", minimumFractionDigits: 3, maximumFractionDigits: 3, useGrouping: true },
  "n4": { style: "decimal", minimumFractionDigits: 4, maximumFractionDigits: 4, useGrouping: true },
  "c": { style: "currency", minimumFractionDigits: 0, maximumFractionDigits: 4 },
  "c0": { style: "currency", minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true },
  "c1": { style: "currency", minimumFractionDigits: 1, maximumFractionDigits: 1, useGrouping: true },
  "c2": { style: "currency", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true },
  "c3": { style: "currency", minimumFractionDigits: 3, maximumFractionDigits: 3, useGrouping: true },
  "c4": { style: "currency", minimumFractionDigits: 4, maximumFractionDigits: 4, useGrouping: true },
  "p": { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 4 },
  "p0": { style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true },
  "p1": { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1, useGrouping: true },
  "p2": { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true },
  "p3": { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3, useGrouping: true },
  "p4": { style: "percent", minimumFractionDigits: 4, maximumFractionDigits: 4, useGrouping: true },
}

const numberFormats: Record<string, Intl.NumberFormat> = {};
const numberFormatters: Record<string, Formatter> = {};
const numberParsers: Record<string, Parser> = {};
const numberCommaSeparators: Record<string, string | undefined> = {};

export function getNumberFormatter(locale: string, formatStr: string) {
  const key = `${locale};${formatStr}`;

  let formatter: Formatter = numberFormatters[key];
  if (!formatter) {
    formatter = (value: number) => {
      if (value == void (0)) {
        return null;
      }

      const numberFormat = getNumberFormatEx(locale, formatStr);
      return numberFormat.format(value);
    };

    numberFormatters[key] = formatter;
  }

  return formatter;
}
export function getNumberParser(locale: string, formatStr: string) {
  const key = `${locale};${formatStr}`;

  let parser: Parser = numberParsers[key];
  if (!parser) {
    parser = (value: string) => {
      if (value == void (0)) {
        return null;
      }

      const numberFormat = getNumberFormatEx(locale, formatStr);
      const separator = getNumberCommaSeparator(key, numberFormat);
      let separatorAdded = false;
      
      let r = "";
      for (let i = 0; i < value.length; i++) {
        const c = value.substring(i, i + 1);
        if (c == separator && (i + 1) != value.length && !separatorAdded) {
          r += ".";
          separatorAdded = true;
        } else if (isInteger(c)) {
          r += c;
        }
      }
      
      return Number(r);
    };

    numberParsers[formatStr] = parser;
  }

  return parser;
}
export function getNumberFormatterParser(locale: string, formatStr: string) {
  return {
    formatter: getNumberFormatter(locale, formatStr),
    parser: getNumberParser(locale, formatStr)
  };
}
export function getNumberFormat(locale: string, formatStr: string) {
  return DefaultNumberFormats[formatStr];
}
function getNumberFormatEx(locale: string, formatStr: string) {
  const key = `${locale};${formatStr}`;

  let format = numberFormats[key];
  if (!format) {
    format = Intl.NumberFormat(locale, DefaultNumberFormats[formatStr]);
    numberFormats[key] = format;
  }

  return format;
}
function getNumberCommaSeparator(key: string, numFormat: Intl.NumberFormat) {
  let separator = numberCommaSeparators[key];
  if (separator == void(0)) {
    separator = "";
    
    const s = numFormat.format(1.9);
    const indexOf = s.indexOf("9");
    if (indexOf > 0) {
      separator = s.substring(indexOf - 1, indexOf);
    }
    
    numberCommaSeparators[key] = separator;
  }
  
  return separator;
}

function isInteger(value: string) {
  const number = Number(value);
  return Number.isInteger(number);
}

type Formatter = (value: any) => string | null;
type Parser = (value: string) => number | Date | null;

type DateTimeToken = {
  type: "year" | "month" | "day" | "hour" | "minute" | "second" | "am";
  length: number;
}