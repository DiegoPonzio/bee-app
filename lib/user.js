import axios from "axios"
import { use, useEffect, useState } from "react"

const useUser = () => {
    try {
        const [user, setUser] = useState()
        const [message, setMessage] = useState()
        const fetchU = async () => {
            try {
                const res = await axios.get("/api/user")
                const { user, message } = res.data
                setUser(user)
                setMessage(message)
            } catch (error) {
                setMessage(undefined)
                setUser(undefined)
            }
        }

        useEffect(() => {
            fetchU()
        }, [user, message])

        return [user, message]

    } catch (error) {
        return { user: undefined, message: error }
    }
}

export default useUser