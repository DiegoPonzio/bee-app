import withSession from "../../lib/session";
import { method1 } from "../../lib/upload";

export default withSession(async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).send(`Invalid method: ${req.method}`);
        return;
    }

    const user = req.session.get("user")

    if (!user) {
        res.status(401).send(`Invalid user: ${user}`);
        return;
    }

    if (user.priv_id !== 1) {
        res.status(403).send(`Invalid user: ${user}`);
        return;
    }

    method1(req, res);
})

export const config = {
    api: {
        bodyParser: false,
    },
};