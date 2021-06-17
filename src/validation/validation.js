
const validation = {
    email: {
      presence: {
        message: '^Vennligst oppgi en e-postadresse',
        allowEmpty: false
      },
      email: {
        message: '^Vennligst oppgi en gyldig e-postadresse'
      }
    },
    
    name: {
      presence: {
        message: '^Vennligst oppgi det fulle navnet ditt',
        allowEmpty: false
      },
    },

    password: {
      presence: {
        message: '^Vennligst oppgi et passord',
        allowEmpty: false
      },
      length: {
        minimum: 5,
        message: '^Passordet ditt må være minst 6 tegn'
      }
    }
}

export default validation;