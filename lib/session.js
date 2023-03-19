import { withIronSession } from "next-iron-session"

export default function withSession(handler){
    return withIronSession(handler, {
        password: process.env.PASS_COOKIE,
        cookieName: 'beeCookie',
        cookieOptions: {
            // esto se puede ocupar en modo de desarrollo donde no ocupamos https
            secure: process.env.NODE_ENV === "production"
        }
    })
}