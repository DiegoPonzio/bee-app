import { AiOutlineUser } from 'react-icons/ai'

export default function Comments({ user, text }) {
    return (
        <div className="">
            <article className="p-6 mb-6 text-base bg-white rounded-lg">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                            <AiOutlineUser />{" "}
                            {/* hay que poner el nombre del usuario  */}
                            {user}
                        </p>
                    </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                    {text}
                </p>
            </article>
        </div>
    )
}