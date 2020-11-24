const noLeadingOrTrailingSpace = {
  pattern: /(^\S.*\S$)|(\S)/,
  message: 'cannot start or end with a space'
}

export const registerConstraints = {
  name: {
    presence: { allowEmpty: false },
    length: { minimum: 3 }
  },
  password: {
    presence: { allowEmpty: false },
    length: {
      minimum: 3
    },
    format: noLeadingOrTrailingSpace
  },
  email: {
    presence: { allowEmpty: false },
    email: true
  }
}

export const loginConstraints = {
  password: {
    presence: { allowEmpty: false },
    format: noLeadingOrTrailingSpace
  },
  email: {
    presence: { allowEmpty: false },
    email: true
  }
}