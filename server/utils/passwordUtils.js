const bcrypt = require('bcrypt');

/* 
    -- Salt: A value that is concatenated to a password before hashing
    -- Salt Round: Can be described as the amount of time needed to 
    calculate a single hash. 

    -- To hash a password, we need to:
    1. Generate a salt
    2. Hash the password using the plaintext password & salt

    -- To verify a password, we need to:
    1. Retrieve the plain text password
    2. Hash the plaintext password
    3. Compare the hashed password with the on stored in our DB. 
    A hash should return the same value given the same input
    -- bycrpt.compare(plaintextPassword, hashedPassword)
*/

module.exports = {
  hashPassword: async function(password) {
    try {
      const salt = await bcrypt.genSalt(Number.parseInt(process.env.SALT_ROUNDS));
      // const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  verifyPassword: async function(password, hash) {
    try {
      const isValid = await bcrypt.compare(password, hash);
      return isValid;
    } catch(err) {
      console.log(err);
    }
    return false;
  }
};