
const validation = {
    email: {
      presence: {
        message: '^Please enter an email address',
        allowEmpty: false
      },
      email: {
        message: '^Please enter a valid email address'
      }
    },
    
    name: {
      presence: {
        message: '^Please enter your name',
        allowEmpty: false
      },
    },

    password: {
      presence: {
        message: '^Please enter a password',
        allowEmpty: false
      },
      length: {
        minimum: 5,
        message: '^Your password must be at least 8 characters'
      }
    }
}

export default validation;