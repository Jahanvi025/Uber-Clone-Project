import AdminModel from "../models/admin.model.js"; 

export const createAdmin = async ({ username, email, password }) => {
    try {
        
        if (!username || !email || !password) {
            throw new Error("Please fill in all required fields");
        }

        const newAdmin = await AdminModel.create({
            username,
            email,
            password 
        });

        return newAdmin;  
    } catch (error) {
        throw new Error(`Error creating admin: ${error.message}`);
    }
};
