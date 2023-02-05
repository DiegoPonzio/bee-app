import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";

const Banner404 = ({ error = 404, title = "Comunicado no encontrado", desc = "Lo sentimos pero el comunicado que buscas no se encontro. Porfavor regresa al inicio.", err4 = false }) => {
  return (
    <div className="bg-gray-100 h-96 w-6/12 shadow-2xl  grid grid-cols-2 rounded-md   items-center justify-center  border-amber-300 p-12">
      <div>
        <MdOutlineCancel className="text-gray-600" size={240} />
      </div>
      <div className="text-left">
        <h1 className="text-7xl  font-bold text-gray-600 mt-15">{error}</h1>
        <h2 className="text-2xl  font-semibold text-gray-600">
          {title}{" "}
        </h2>
        <h3 className="text-1xl text-gray-600 ">
          {desc}
        </h3>
        <button className="bg-amber-200  hover:bg-gray-400 cursor-pointer rounded-md h-10 w-40 mt-5 font-semibold text-gray-600">
          {err4 ? (
            <a href="/" className="text-2xl">
              Regresar
            </a>
          ) : (
            <Link href={"/user/home"} legacyBehavior>
              <a className="text-2xl">
                Regresar
              </a>
            </Link>
          ) }
        </button>
      </div>
    </div>
  );
}

export default Banner404