const arrowKeyCodes = [37, 38, 39, 40];
const numPadKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
const floatingKeyCode = 190;
const backspaceKeyCode = 8;

export function checkDigit(keyCode, key, selectionStart, value, event) {
  const isValidKey =
    (keyCode >= 48 && keyCode <= 57) ||
    numPadKeyCodes.includes(keyCode) ||
    arrowKeyCodes.includes(keyCode) ||
    keyCode === backspaceKeyCode;

  const isLeadingZero = selectionStart === 0 && key === "0" && value !== "";

  if (!isValidKey || isLeadingZero) {
    event.preventDefault();
  }

  if (value[0] === "0") {
    value = value.slice(1);
  }
}

export function checkRateDigit(keyCode, key, selectionStart, value, event) {
  const isValidNumericKey =
    (keyCode >= 48 && keyCode <= 57) || numPadKeyCodes.includes(keyCode);
  const isValidControlKey =
    arrowKeyCodes.includes(keyCode) || keyCode === backspaceKeyCode;
  const isValidDecimalKey = keyCode === floatingKeyCode && !value.includes(".");

  const hasMaxDecimals = value.split(".")[1]?.length >= 2;
  const isLeadingZero = selectionStart === 0 && key === "0" && value !== "";
  const isDoubleZero = value[0] === "0" && key === "0" && !value.includes(".");

  if (!isValidNumericKey && !isValidControlKey && !isValidDecimalKey) {
    event.preventDefault();
  }

  if (
    hasMaxDecimals &&
    !isValidControlKey &&
    selectionStart > value.indexOf(".")
  ) {
    event.preventDefault();
  }

  if (isLeadingZero || isDoubleZero) {
    event.preventDefault();
  }
}
export function checkPrecedingZero(selectionStart, value, inputId) {
  if (
    (selectionStart <= 1 && value.length > 2) ||
    (value[1] > "0" && value.length === 2)
  ) {
    let newValue = value.replace(/^0+/, "");
    newValue = parseFloat(newValue) || 0;
    document.getElementById(inputId).value = newValue.toString();
  }
}
