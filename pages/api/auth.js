import withSession from "../../lib/session";

export default withSession(async (req, res) => {
    switch (req.method) {
        case "POST":
            try {

                const {userName, description} = req.body

                const Myuser = {
                    userName,
                    description
                }

                const response = await saveSession(Myuser, req) 
                return res.status(200).json({ message: "Acepted", result: response, status: 200 })

            } catch (error) {
                return res.status(200).json({ message: 'Erro Time out', result: error, status: 408 })
            }
        case "GET":
            return res.status(400).json({ message: "Bad request" })
    }
})

async function saveSession(user, request) {
    request.session.set("user", user);
    await request.session.save();
}