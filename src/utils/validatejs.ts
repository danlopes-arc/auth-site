export const normalize = (value?: string) => {
  return value ? value : null
}

export const trimNormalize = (value?: string) => {
  if (value) {
    value = value.trim()
  }
  return normalize(value)
}

export const trimIfOnlySpacesNormalize = (value?: string) => {
  if (value) {
    value = value.trim() === '' ? value.trim() : value
  }
  return normalize(value)
}
