import { withIronSession } from "next-iron-session"

export default function withSessionCecyt(handler){
    return withIronSession(handler, {
        password: 'cookie_valeria_ximena_barbara_erick_diego_bee',
        cookieName: 'CECyT-cookie',
        cookieOptions: {
            // esto se puede ocupar en modo de desarrollo donde no ocupamos https
            secure: process.env.NODE_ENV === "production"
        }
    })
}