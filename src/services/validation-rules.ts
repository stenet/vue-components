import type { ValidationCallbackData } from "devextreme/ui/validation_rules";
import moment from "moment";

const rules: Record<string, ValidationCallback> = {};

registerValidationRule("required", (ev) => {
  if (ev.value == void (0) || ev.value === "") {
    ev.rule.message = "Required";
    return false;
  }

  return true;
});

registerValidationRule("stringLength", (ev, params) => {
  if (params.min && (ev.value?.toString() || "").length < params.min) {
    ev.rule.message = `Min. length = ${params.min}`;
    return false;
  }

  if (params.max && (ev.value?.toString() || "").length > params.max) {
    ev.rule.message = `Max. length = ${params.max}`;
    return false;
  }

  return true;
});

registerValidationRule("alphanumeric", (ev) => {
  if (ev.value == void (0) || ev.value == "") {
    return true;
  }

  const value = ev.value as string;
  const isValid = /^([a-zA-Z0-9]*)$/.test(value);
  if (!isValid) {
    ev.rule.message = "Only characters and numbers allowed";
    return false;
  }

  return true;
});

registerValidationRule("numeric", (ev) => {
  if (ev.value == void (0) || ev.value == "") {
    return true;
  }

  const value = ev.value as string;
  const isValid = /^([0-9]*)$/.test(value);
  if (!isValid) {
    ev.rule.message = "Only numbers allowed";
    return false;
  }

  return true;
});

registerValidationRule("email", (ev) => {
  if (ev.value == void (0) || ev.value == "") {
    return true;
  }

  const value = <string>ev.value;

  const isValid = /^[\d\w\._\-]+@([\d\w\._\-üäö]+\.)+[\w]+$/i.test(value);
  if (!isValid) {
    ev.rule.message = "Invalid email";
    return false;
  }

  return true;
});

registerValidationRule("password", (ev) => {
  const value = <string>ev.value;
  if (!value) {
    return true;
  }

  if (value.length < 6) {
    ev.rule.message = "Password needs min. 6 characters";
    return false;
  }

  if (!/[A-Z]+/.test(value)) {
    ev.rule.message = "Password needs min. one uppercase character";
    return false;
  }

  if (!/[a-z]+/.test(value)) {
    ev.rule.message = "Password needs min. one lowercase character";
    return false;
  }

  if (!/[0-9]+/.test(value)) {
    ev.rule.message = "Password needs min. one number";
    return false;
  }

  return true;
});

registerValidationRule("dateInPast", (ev) => {
  const value = <Date><any>ev.value;
  if (!value) {
    return true;
  }

  const isInFuture = moment(value).isBefore(moment().startOf("day"));
  if (!isInFuture) {
    ev.rule.message = "Date has to be in past";
    return false;
  }

  return true;
});

registerValidationRule("dateInFuture", (ev) => {
  const value = <Date><any>ev.value;
  if (!value) {
    return true;
  }

  const isInFuture = moment(value).isAfter(moment().startOf("day"));
  if (!isInFuture) {
    ev.rule.message = "Date has to be in future";
    return false;
  }

  return true;
});

export function registerValidationRule(name: string, callback: ValidationCallback) {
  rules[name] = callback;
}

export function validateRules(validators: Record<string, any>, ev: ValidationCallbackData) {
  for (const key in validators) {
    const params = validators[key];
    const rule = rules[key];
    if (!rule) {
      continue;
    }

    const r = rule(ev, params || {});
    if (!r) {
      return r;
    }
  }

  return true;
}

export type ValidationCallback = (ev: ValidationCallbackData, params: Record<string, string | number>) => boolean;