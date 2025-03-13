import { OAuth2Client } from 'google-auth-library';
import { hashPassword, comparePassword } from '../helpers/bcyrpt.js';
import { User } from '../models/index.js';
import { signToken } from '../helpers/jwt.js';
class UserController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const compared = comparePassword(password, user.password)
            const access_token = signToken({ id: user.id })
            res.status(200).json({
                access_token
            })
        } catch (error) {
            console.log("🚀 ~ UserController ~ login ~ error:", error)
        }
    }


    static async googleLogin(req, res, next) {
        try {
            const { googleToken } = req.body
            // console.log("🚀 ~ UserController ~ googleLogin ~ googleToken:", googleToken)
            if (!googleToken) {
                throw { name: "InvalidGoogleToken", message: "Missing google token" };
            }
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID, 
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.given_name,
                    email: payload.email,
                    password: Date.now().toString() + Math.random().toString(),
                    role: "staff"
                }
            })
            const access_token = signToken({ id: user.id })
            res.status(200).json({
                access_token
            })
        } catch (error) {
        console.log("🚀 ~ UserController ~ googleLogin ~ error:", error)
        }
    }

}

export default UserController;
