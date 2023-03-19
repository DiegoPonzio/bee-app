import { useRouter } from "next/router"
import useUser from "../../lib/user"

const Likes = () => {
    const router = useRouter()
    const { desc } = router.query
    const [user, message] = useUser()
    
    return (
        <div className="text-white">
            mis likes
        </div>
    )
}

export default Likes