import { IoLogoFacebook } from 'react-icons/io'
import { AiOutlineInstagram, AiOutlineTwitter, AiFillGithub } from 'react-icons/ai'
export default function Footer() {
    return (

        <footer className="fixed bottom-0 left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 max-sm:hidden">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com/" className="hover:underline">BEE+™</a>. All Rights Reserved.
            </span>

            <ul className="flex flex-wrap items-right mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 "></a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Politica de privacidad</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Licencia</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contactanos</a>
                </li>
            </ul>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                <a href="#" className="text-gray-500 hover:text-yellow-300 ">
                    <IoLogoFacebook size={25} />
                    <span className="sr-only">Facebook page</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-yellow-300 ">
                    <AiOutlineInstagram size={25} />
                    <span className="sr-only">Instagram page</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-yellow-300 ">
                    <AiOutlineTwitter size={25} />
                    <span className="sr-only">Twitter page</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-yellow-300 ">
                    <AiFillGithub size={25} />
                    <span className="sr-only">GitHub account</span>
                </a>

            </div>
        </footer>

    )
}