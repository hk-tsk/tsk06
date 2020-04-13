import { ReplaceAll } from "./textConvertor";

function getValidatorObject(valided: boolean, message: string) {
  return { isValid: valided, errorMsg: message };
}
export function RequiredFieldValidator(value: string, field: string) {
  const newValue = ReplaceAll(value, " ", "");
  const isValidValue = newValue !== null && newValue !== "";
  const errorText = isValidValue ? "" : field + " اجباری می باشد.";
  return getValidatorObject(isValidValue, errorText);
}

export function EmailFieldValidator(value: string, field: string) {
  if (value.length === 0) {
    return getValidatorObject(true, "");
  }
  const emailReg = new RegExp(
    /^[a-zA-Z\-0-9\.+-]+@[a-zA-Z\-0-9\-.]+\.[a-zA-Z]{2,5}$/
  );
  const isValidValue = emailReg.test(value);
  const errorText = isValidValue ? "" : "ایمیل معتبر وارد نمایید.";
  return getValidatorObject(isValidValue, errorText);
}
export function SameFieldValidator(
  value1: string,
  value2: string,
  field1: string,
  field2: string
) {
  const isValidValue = value1 === value2;
  const errorText = isValidValue
    ? ""
    : field2 + " با فیلد " + field1 + " یکسان نمی باشد .";
  return getValidatorObject(isValidValue, errorText);
}

export function MinLenFieldValidator(
  value: string,
  field: string,
  charLeng: number
) {
  const isValidValue = value && value.length ? value.length <= charLeng : false;
  const errorText = isValidValue
    ? ""
    : field + " باید حداقل " + charLeng + "حرف داشته باشد.";
  return getValidatorObject(isValidValue, errorText);
}

export function MaxLenFieldValidator(
  value: string,
  field: string,
  charLeng: number
) {
  const isValidValue = value && value.length ? value.length >= charLeng : false;
  const errorText = isValidValue
    ? ""
    : field + " باید حداکثر " + charLeng + "حرف داشته باشد.";
  return getValidatorObject(isValidValue, errorText);
}
