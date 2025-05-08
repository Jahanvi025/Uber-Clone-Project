import { oAuth2Client } from "../utils/googleConfig.js";
import axios from "axios";
import userModel from "../models/user.model.js";

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // Get user info using access token
    const userInfoRes = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const { email, name } = userInfoRes.data;
    if (!email || !name) {
      return res.status(400).json({ message: "Invalid Google user data" });
    }

    const [firstname, ...lastnameParts] = name.split(" ");
    const lastname = lastnameParts.join(" ");

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        fullname: {
          firstname,
          lastname,
        },
        email,
        password: null, // or you may omit this if schema allows
      });
    }

    const token = user.generateAuthToken();

    return res.status(200).json({ token, user });

  } catch (err) {
    console.error("Google login error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
