//allowed key codes
const arrowKeyCodes = [37, 38, 39, 40]; //left, up, right, down
const numPadKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105]; //0-9 on numpad
const floatingKeyCode = 190; //decimal point
const backspaceKeyCode = 8;

//check digit input and prevent invalid keys
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
}

//check rate input and prevent invalid keys and invalid decimal points
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
    return;
  }

  if (
    hasMaxDecimals &&
    !isValidControlKey &&
    selectionStart > value.indexOf(".")
  ) {
    event.preventDefault();
    return;
  }

  if (isLeadingZero || isDoubleZero) {
    event.preventDefault();
    return;
  }
}

//check preceding zero and remove it
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
