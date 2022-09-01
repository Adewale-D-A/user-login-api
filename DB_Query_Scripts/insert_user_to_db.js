const phoneToken = require("generate-sms-verification-code");
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
  var generatedCode = phoneToken(6, { type: "string" });

  HashPassword(
    (password = password),
    (saltRounds = 10),
    (firstname = firstname),
    (lastname = lastname),
    (email = email),
    (username = username),
    (res = res),
    (generatedCode = generatedCode),
    (obj = obj)
  );
};

exports.inserUserToDB = inserUserToDB;
