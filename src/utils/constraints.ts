const noLeadingOrTrailingSpace = {
  pattern: /(^\S.*\S$)|(^\S$)/,
  message: 'cannot start or end with a space',
}

export const registerConstraints = {
  name: {
    presence: true,
    length: { minimum: 3 },
  },
  password: {
    presence: true,
    length: {
      minimum: 3,
    },
    format: noLeadingOrTrailingSpace,
  },
  email: {
    presence: true,
    email: true,
  },
}

export const loginConstraints = {
  password: {
    presence: true,
    format: noLeadingOrTrailingSpace,
  },
  email: {
    presence: true,
    email: true,
  },
}
