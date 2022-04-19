const REGEXP_DATE_ISO = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;

export function replaceStringDatesWithDate(data: any) {
  if (data === null || data === undefined || typeof data !== "object") {
    return data;
  }

  for (const key of Object.keys(data)) {
    const value = data[key];
    if (isIsoDateString(value)) {
      data[key] = new Date(value);
    } else if (typeof value === "object") {
      replaceStringDatesWithDate(value);
    }
  }

  return data;
}
function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && REGEXP_DATE_ISO.test(value);
}