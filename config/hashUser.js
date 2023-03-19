import { hashSync } from "bcryptjs"

const hashUser = (password) => {
    return hashSync(password, process.env.PASS_HASH)
}

export {hashUser}