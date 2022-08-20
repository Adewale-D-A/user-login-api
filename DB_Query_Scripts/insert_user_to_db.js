const { HashPassword } = require("../bcrypt/passwordHashing");

const inserUserToDB = (
  firstname,
  lastname,
  email,
  password,
  username,
  res,
  obj
) => {
  HashPassword(
    (password = password),
    (saltRounds = 10),
    (firstname = firstname),
    (lastname = lastname),
    (email = email),
    (username = username),
    (res = res),
    (obj = obj)
  );
};

exports.inserUserToDB = inserUserToDB;
