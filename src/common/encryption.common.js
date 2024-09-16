import bcrypt from 'bcrypt';

const bcryptHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

const bcryptCompare = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export { bcryptCompare, bcryptHash }; 
