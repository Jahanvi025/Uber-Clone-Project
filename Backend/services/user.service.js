import userModel from "../models/user.model.js";

export const createUser = async ({ firstname, lastname, email, password }) => {
  try {
    if (!firstname || !email || !password) {
      throw new Error("Please fill in all required fields");
    }

    const user = await userModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    });

    return user; 
  } catch (error) {
    throw new Error(error.message);
  }
};
