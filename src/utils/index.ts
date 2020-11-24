export function stringfy(value?: string | null) {
  return value ?? ""
}

export function nullify(value?: string | null) {
  return value ? value : null
}

export const emptyStringToNull = (value?: string | null) => {
  return value ?? "" ? value : value
}
