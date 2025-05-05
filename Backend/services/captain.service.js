import captainModel from "../models/captain.model.js";

export const createCaptain = async ({firstname, lastname, email, password, color, plate, capacity , vehicleType}) => {
    try {
        if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
            throw new Error("Please fill in all required fields");
        }

        const captain = await captainModel.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });

        return captain; 
    } catch (error) {
        throw new Error(error.message);
    }
}