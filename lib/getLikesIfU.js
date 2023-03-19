import axios from "axios"
import { useEffect, useState } from "react"

const useLikeIfU = (user, name) => {
    try {
        const URLLike = `/api/verifLike/${user}/${name}`
        const [like, setLike] = useState()

        const fetchLikes = async () => {
            try {
                const res = await axios.get(URLLike)
                const { newLike } = res.data
                setLike(newLike)
            } catch (error) {
                setLike([])
            }
        }

        useEffect(() => {
            !like && user && fetchLikes()
        }, [like, user])

        return [like]

    } catch (error) {
        return [undefined, error]
    }
}

export default useLikeIfU