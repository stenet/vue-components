import type { ValidationCallbackData } from "devextreme/ui/validation_rules";
import moment from "moment";
import type { Composer, VueMessageType } from "vue-i18n";

const rules: Record<string, ValidationCallback> = {};

registerValidationRule("required", (i18n, ev) => {
  if (ev.value == void (0) || ev.value === "") {
    ev.rule.message = i18n.t("validation.required");
    return false;
  }

  return true;
});

registerValidationRule("stringLength", (i18n, ev, params) => {
  if (params.min && (ev.value?.toString() || "").length < params.min) {
    ev.rule.message = i18n.t("validation.min-length", { min: params.min }, <number>params.min);
    return false;
  }

  if (params.max && (ev.value?.toString() || "").length > params.max) {
    ev.rule.message = i18n.t("validation.max-length", { max: params.max }, <number>params.max);
    return false;
  }

  return true;
});

registerValidationRule("alphanumeric", (i18n, ev) => {
  if (ev.value == void (0) || ev.value == "") {
    return true;
  }

  const value = ev.value as string;
  const isValid = /^([a-zA-Z0-9]*)$/.test(value);
  if (!isValid) {
    ev.rule.message = i18n.t("validation.alphanumeric");
    return false;
  }

  return true;
});

registerValidationRule("numeric", (i18n, ev) => {
  if (ev.value == void (0) || ev.value == "") {
    return true;
  }

  const value = ev.value as string;
  const isValid = /^([0-9]*)$/.test(value);
  if (!isValid) {
    ev.rule.message = i18n.t("validation.numeric");
    return false;
  }

  return true;
});

registerValidationRule("email", (i18n, ev) => {
  if (ev.value == void (0) || ev.value == "") {
    return true;
  }

  const value = <string>ev.value;

  const isValid = /^[\d\w\._\-]+@([\d\w\._\-üäö]+\.)+[\w]+$/i.test(value);
  if (!isValid) {
    ev.rule.message = i18n.t("validation.invalid-email");
    return false;
  }

  return true;
});

registerValidationRule("password", (i18n, ev) => {
  const value = <string>ev.value;
  if (!value) {
    return true;
  }

  if (value.length < 6) {
    ev.rule.message = "Password needs min. 6 characters";
    return false;
  }

  if (!/[A-Z]+/.test(value)) {
    ev.rule.message = i18n.t("validation.password-uppercase");
    return false;
  }

  if (!/[a-z]+/.test(value)) {
    ev.rule.message = i18n.t("validation.password-lowercase");
    return false;
  }

  if (!/[0-9]+/.test(value)) {
    ev.rule.message = i18n.t("validation.password-number");
    return false;
  }

  return true;
});

registerValidationRule("dateInPast", (i18n, ev) => {
  const value = <Date><any>ev.value;
  if (!value) {
    return true;
  }

  const isInFuture = moment(value).isBefore(moment().startOf("day"));
  if (!isInFuture) {
    ev.rule.message = i18n.t("validation.date-in-past");
    return false;
  }

  return true;
});

registerValidationRule("dateInFuture", (i18n, ev) => {
  const value = <Date><any>ev.value;
  if (!value) {
    return true;
  }

  const isInFuture = moment(value).isAfter(moment().startOf("day"));
  if (!isInFuture) {
    ev.rule.message = i18n.t("validation.date-in-future");
    return false;
  }

  return true;
});

export function getValidationRule(name: string) {
  return rules[name];
}
export function hasValidationRule(name: string) {
  return !!rules[name];
}

export function registerValidationRule(name: string, callback: ValidationCallback) {
  rules[name] = callback;
}

export function validateRules(i18n: I18N, validators: Record<string, any>, ev: ValidationCallbackData) {
  for (const key in validators) {
    const params = validators[key];
    const rule = rules[key];
    if (!rule) {
      continue;
    }

    const r = rule(i18n, ev, params || {});
    if (!r) {
      return r;
    }
  }

  return true;
}

export type ValidationCallback = (i18n: I18N, ev: ValidationCallbackData, params: ValidationParams) => boolean;
type ValidationParams = Record<string, string | number>;

type I18N = Composer<unknown, unknown, unknown, VueMessageType>;