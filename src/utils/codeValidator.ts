export function codeValidator(code: string): boolean {
  if (code.length === 13 && code.match(/^\D{2}\d{9}\D{2}/)) {
    return true;
  }
  return false;
}
