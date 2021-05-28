function validateString(
  fieldName,
  value,
  required,
  minLength = -1,
  maxLength = -1
) {
  if (value) {
    if (minLength !== -1 && value.length < minLength) {
      throw {
        error: true,
        message:
          fieldName +
          ' has to be longer than ' +
          minLength +
          ' symbols',
      };
    } else if (
      maxLength !== -1 &&
      value.length > maxLength
    ) {
      throw {
        error: true,
        message:
          fieldName +
          ' has to be smaller than ' +
          maxLength +
          ' symbols',
      };
    } else {
      return { ok: true };
    }
  } else if (required) {
    throw {
      error: true,
      message: fieldName + ' is required',
    };
  } else {
    return { ok: true };
  }
}

module.exports = { validateString };
