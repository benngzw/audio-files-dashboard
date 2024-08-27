export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string!",
    },
  },
  password: {
    notEmpty: true,
  },
  displayName: {
    notEmpty: true,
  },
};

export const updateUserValidationSchema = {
  username: {
    optional: true,
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        "Username must be at least 5 characters with a max of 32 characters",
    },
    isString: {
      errorMessage: "Username must be a string!",
    },
  },
  password: {
    optional: true,
    isString: {
      errorMessage: "Password must be a string!",
    },
  },
  displayName: {
    optional: true,
    isString: {
      errorMessage: "Display name must be a string!",
    },
  },
};
