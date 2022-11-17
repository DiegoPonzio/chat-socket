import { withIronSession } from "next-iron-session"

export default function withSession(handler){
    return withIronSession(handler, {
        password: 'cookie_del_increible_chat_de_didi',
        cookieName: 'Chat-Cookie',
        cookieOptions: {
            // esto se puede ocupar en modo de desarrollo donde no ocupamos https
            secure: process.env.NODE_ENV === "production"
        }
    })
}

