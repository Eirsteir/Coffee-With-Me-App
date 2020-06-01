
const validation = {
    email: {
      presence: {
        message: '^Please enter an email address'
      },
      email: {
        message: '^Please enter a valid email address'
      }
    },
    
    name: {
        presence: {
            message: '^Please enter your name'
        }
    },

    password: {
      presence: {
        message: '^Please enter a password'
      },
      length: {
        minimum: 5,
        message: '^Your password must be at least 8 characters'
      }
    }
}

export default validation;