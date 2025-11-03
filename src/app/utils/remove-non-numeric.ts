function removeNonNumeric(value: string): string {
  return value?.replace(/\D/g, '');
}

function getZipCodeLength(value: string): number {
  let position = value?.indexOf('-');
  if (value?.includes('-', position)) return removeNonNumeric(value)?.length;
  else return value?.length;
}

export { removeNonNumeric, getZipCodeLength };
