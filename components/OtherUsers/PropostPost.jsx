import { CgSandClock } from 'react-icons/cg'
import { TiTick } from "react-icons/ti"
import { MdCancel } from "react-icons/md"
import Link from 'next/link'

const PropostPost = ({ title = "Titulo del comunicado", icon = 1, user, sol }) => {

    return (
        <Link href={`/user/${user}/${sol}`} legacyBehavior>
            <div className="p-4 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 lg:block">
                <div className="flex justify-center items-center p-2 mx-auto mb-2 max-w-[48px] bg-gray-200 rounded-full w-18 h-18">
                    {icon === 1 && <CgSandClock size={25} />}
                    {icon === 2 && <TiTick size={25} color="green" />}
                    {icon === 3 && <MdCancel size={25} color="#CB3234" />}
                </div>
                <div className="font-medium text-center text-gray-500">{title}</div>
            </div>
        </Link>
    )
}

export default PropostPost