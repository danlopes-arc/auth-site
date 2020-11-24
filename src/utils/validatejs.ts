export const normalize = (value?: string) => {
  return value ? value : null
}

export const trimNormalize = (value?: string) => {
  if (value) {
    value = value.trim()
  }
  return normalize(value)
}