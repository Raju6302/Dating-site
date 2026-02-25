const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!(firstName.length > 3 && firstName.length < 51) || !lastName) {
    throw new Error(
      "FirstName is required characters length should between 4 to 50."
    );
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

const validateProfileEdit = (req) => {
  const allowedFiledsEdit = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "skills",
    "about",
  ];

  const editFileds = Object.keys(req.body).every((field) =>
    allowedFiledsEdit.includes(field)
  );

  return editFileds;
};

module.exports = { validateSignUp, validateProfileEdit };
