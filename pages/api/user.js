import withSession from "../../lib/session"

export default withSession(async (req, res) => {
    switch (req.method) {
        case "GET":
            const user = req.session.get("user")

            if (user) {
                //existe el usuario
                const { usu_nombre } = user

                return res.status(200).json(
                    {
                        message: "User is Logged",
                        user: usu_nombre
                    }
                )
            } else {
                // no existe el usuario
                return res.status(404).json(
                    {
                        message: "User not found"
                    }
                )
            }

        default:
            return res.status(400).json({ message: "Bad request" })
    }
})  