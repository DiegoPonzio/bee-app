import { compare } from "bcryptjs"

const validate = async (password, bdpassword) => {
    return await compare(password, bdpassword)
}

export {validate}