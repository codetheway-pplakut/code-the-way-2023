/* eslint-disable no-plusplus */
import { EmailRegex } from './email-regex';
import { NumRegex } from './num-regex';
import { SpecRegex } from './special-character-regex';

function checkFill(text) {
  if (text.length === 0) {
    return true;
  }
  return false;
}

function checkShort(text) {
  if (text.length < 6) {
    return true;
  }
  return false;
}

function checkSpace(text) {
  if (text.includes(' ')) {
    return true;
  }
  return false;
}

function checkEmail(text) {
  if (!EmailRegex(text)) {
    return true;
  }
  return false;
}

function checkNum(text) {
  if (!NumRegex(text)) {
    return true;
  }
  return false;
}

function checkSpec(text) {
  if (!SpecRegex(text)) {
    return true;
  }
  return false;
}

export function ErrorLogic(conditions, messages, text) {
  let shouldError = false;
  let errorMessage = '';

  for (let i = 0; i < conditions.length; i++) {
    const condition = conditions[i];
    const message = messages[i];

    switch (condition) {
      case 'fill':
        shouldError = checkFill(text);
        if (shouldError === true) errorMessage = message;

        break;

      case 'short':
        shouldError = checkShort(text);
        if (shouldError === true) errorMessage = message;

        break;

      case 'space':
        shouldError = checkSpace(text);
        if (shouldError === true) errorMessage = message;

        break;
      case 'spec':
        shouldError = checkSpec(text);
        if (shouldError === true) errorMessage = message;

        break;
      case 'email':
        shouldError = checkEmail(text);
        if (shouldError === true) errorMessage = message;

        break;

      case 'num':
        shouldError = checkNum(text);
        if (shouldError === true) errorMessage = message;

        break;

      default:
        errorMessage = '';
        break;
    }

    if (shouldError === true) {
      break;
    }
  }

  return [shouldError, errorMessage];
}
