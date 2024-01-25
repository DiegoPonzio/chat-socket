import User from "components/User"
import withSession from "../lib/session"

const login = () => {
    return (
        <User />
    )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user")

    if (user !== undefined) {
        res.setHeader("location", "/")
        res.statusCode = 302
        res.end()
        return { props: {} }
    }

    return {
        props: { }
    }

})

export default login;
