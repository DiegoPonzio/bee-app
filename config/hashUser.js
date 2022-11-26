import { hashSync } from "bcryptjs"

const hashUser = (password) => {
    return hashSync(password, 8)
}

export {hashUser}