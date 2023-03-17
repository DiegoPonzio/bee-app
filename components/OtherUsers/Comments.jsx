import { AiOutlineUser } from 'react-icons/ai'

export default function Comments({ user, text }) {
    return (
        <div className="snap-center">
            <article className="p-4 mb-2 text-base rounded-lg">
                <footer className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-white">
                            <AiOutlineUser />{" "}
                            {/* hay que poner el nombre del usuario  */}
                            {user}
                        </p>
                    </div>
                </footer>
                <p className="text-gray-300">
                    {text}
                </p>
            </article>
        </div>
    )
}