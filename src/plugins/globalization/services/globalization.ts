import moment from "moment";

export interface IGlobalizationProvider {
  culture: string;

  d: string;
  D: string;
  e: string;
  E: string;
  f: string;
  F: string;
  g: string;
  G: string;
  t: string;
  T: string;

  commaSeparator: string;
  groupSeparator: string;

  months: string[];
  monthsShort: string[];
  days: string[];
  daysShort: string[];
}

export class GermanGlobalizationProvider implements IGlobalizationProvider {
  culture = "de";

  d = "DD.MM.YYYY";
  D = "dddd, DD. MMM YYYY";
  e = "dd., DD.MM.YYYY";
  E = "dd., DD.MM.YYYY HH:mm";
  f = "dddd, DD. MMM YYYY, HH:mm";
  F = "dddd, DD. MMM yyyy, HH:mm:ss";
  g = "DD.MM.YYYY HH:mm";
  G = "DD.MM.YYYY HH:mm:ss";
  t = "HH:mm";
  T = "HH:mm:ss";

  commaSeparator = ",";
  groupSeparator = " ";

  months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  monthsShort = ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
  days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  daysShort = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];
}

const NUMBER_FORMAT_MIN_LENGTH = 2;
const NUMBER_GROUP_COUNT = 3;
const CUSTOM_DATE_PREFIX = "DT_";
const PERCENTAGE_MULTIPLIER = 100;
const ESCAPE_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

let current: IGlobalizationProvider & Record<string, any>;
let formatters: Record<string, any>;
let parsers: Record<string, any>;

setProvider(new GermanGlobalizationProvider());

export function setProvider(provider: IGlobalizationProvider) {
  current = provider;
  formatters = {};
  parsers = {};

  const devExpress: any = (<any>window).DevExpress;
  if (devExpress) {
    devExpress.localization.locale(provider.culture);

    devExpress.localization.date.inject({
      getMonthNames: (format: string) => {
        if (format == "abbreviated") {
          return provider.monthsShort;
        } else {
          return provider.months;
        }
      },
      getDayNames: (format: string) => {
        if (format == "abbreviated") {
          return provider.daysShort;
        } else {
          return provider.days;
        }
      }
    });
  }
}

export function format(value: any, formatStr: string) {
  return getFormatter(formatStr)(value);
}
export function getFormatter(formatStr: string) {
  let formatter: Formatter = formatters[formatStr];

  if (formatter == void (0)) {
    formatter = (value: any) => {
      if (value == void (0)) {
        return null;
      }

      if (formatStr.length === 1 || formatStr.startsWith(CUSTOM_DATE_PREFIX)) {
        let momentFormat: string;

        if (formatStr.startsWith(CUSTOM_DATE_PREFIX)) {
          momentFormat = formatStr.substr(CUSTOM_DATE_PREFIX.length);
        } else if (formatStr == "p") {
          momentFormat = moment(value)
            .isSame(moment(), "day")
            ? current.t
            : current.g;
        } else {
          momentFormat = current[formatStr];
        }

        return moment(value)
          .locale(current.culture)
          .format(momentFormat);
      } else {
        const count = parseInt(formatStr.substr(1)) || 0;
        const formatClass = formatStr.substr(0, 1);

        if (formatClass === "p") {
          value = value * PERCENTAGE_MULTIPLIER;
        }

        const prefix = value < 0
          ? "-"
          : "";

        const valueInt = parseInt(value = Math.abs(Number(value) || 0)
          .toFixed(count));

        const valueIntAsString = String(valueInt);

        let groupRest = valueIntAsString.length;
        groupRest = groupRest > NUMBER_GROUP_COUNT
          ? groupRest % NUMBER_GROUP_COUNT
          : 0;

        const magicTwo = 2; //??

        return prefix
          + (groupRest
            ? valueIntAsString.substr(0, groupRest) + current.groupSeparator
            : "")
          + valueIntAsString
            .substr(groupRest)
            .replace(/(\d{3})(?=\d)/g, "$1" + current.groupSeparator)
          + (count
            ? current.commaSeparator + Math.abs(value - valueInt)
            .toFixed(count)
            .slice(magicTwo)
            : "")
          + (formatClass === "p"
            ? " %"
            : "");
      }
    };

    formatters[formatStr] = formatter;
  }

  return formatter;
}
export function getParser(formatStr: string) {
  let parser: Parser = parsers[formatStr];

  if (parser == void (0)) {
    parser = (value: string) => {
      if (value == void (0)) {
        return null;
      }

      if (formatStr.length === 1 || formatStr.startsWith(CUSTOM_DATE_PREFIX)) {
        const momentFormat = formatStr.startsWith(CUSTOM_DATE_PREFIX)
          ? formatStr.substr(CUSTOM_DATE_PREFIX.length)
          : current[formatStr];

        let result: moment.Moment | null = null;

        if (value === " ") {
          result = moment()
            .startOf("day");
        } else if (value.startsWith("+") || value.startsWith("-")) {
          const numberAsStr = value.substr(1);
          const numb = parseInt(numberAsStr);
          if (isNaN(numb)) {
            return null;
          }

          const isSubstract = value.startsWith("-");

          result = isSubstract
            ? moment()
              .startOf("day")
              .subtract(numb, "days")
            : moment()
              .startOf("day")
              .add(numb, "days");
        } else {
          result = moment(value, momentFormat);
        }

        if (result.isValid()) {
          return result.toDate();
        } else {
          return null;
        }
      } else {
        const groupFinder = current.groupSeparator.replace(ESCAPE_REGEX, "\\$&");
        value = value
          .replace(new RegExp(groupFinder, "g"), "")
          .replace(new RegExp("%", "g"), "")
          .replace(new RegExp(" ", "g"), "");

        const indexOf = value.indexOf(current.commaSeparator);

        let b = value;
        let a = "";
        if (indexOf >= 0) {
          b = value.substr(0, indexOf);
          a = value.substr(indexOf + 1);
        }

        const count = parseInt(formatStr.substr(1));
        const formatClass = formatStr.substr(0, 1);

        switch (formatClass) {
          case "f":
          case "n": {
            return parseInt(b) + makeComma(a);
          }
          case "p": {
            return (parseInt(b) + makeComma(a)) / PERCENTAGE_MULTIPLIER;
          }
          default: {
            throw new Error(`Not implemented format ${formatStr}`);
          }
        }
      }
    };

    parsers[formatStr] = parser;
  }

  return parser;
}
export function getFormatterParser(formatStr: string) {
  return {
    formatter: getFormatter(formatStr),
    parser: getParser(formatStr)
  };
}
function getNumberFormat(formatStr: string) {
  if (formatStr.length < NUMBER_FORMAT_MIN_LENGTH) {
    throw new Error(`Invalid number format ${formatStr}`);
  }

  const f = formatStr.substr(0, 1);
  const n = parseInt(formatStr.substr(1));

  let nk = "";
  if (n > 0) {
    nk = "." + "0".repeat(n);
  }

  switch (f) {
    case "f":
    case "F": {
      return `#0${nk}`;
    }
    case "n":
    case "N": {
      return `#,##0${nk}`;
    }
    case "p":
    case "P": {
      return `#,##0${nk} %`;
    }
    default: {
      throw new Error(`Invalid number format ${formatStr}`);
    }
  }
}

function  makeComma(value: string) {
  const base = 10;
  return parseInt(value) / Math.pow(base, value.length);
}

type Formatter = (value: any) => string | null;
type Parser = (value: string) => number | Date | null;