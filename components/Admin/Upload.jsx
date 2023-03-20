import { useContext, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useFile } from "../../clientServices/hamburger"

const Upload = () => {
    const ctx = useContext(useFile)
    const { files, setFiles, images, setImages } = ctx
    const [fileName, setFileName] = useState("")

    const onDrop = (file) => {
        const files = file[0]
        setFileName(files.name)
        const imageFile = URL.createObjectURL(files)
        const formData = new FormData()
        formData.append("file", files)
        setFiles(formData)
        setImages(imageFile)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div>
            {files.length === 0 && (
                <div className={`flex flex-col justify-center items-center w-full h-64 ${isDragActive ? "bg-amber-200" : "bg-gray-50"} rounded-lg border-2 border-black border-dashed cursor-pointer`} {...getRootProps()}>

                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="mb-3 w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 break-words">
                            <input type="file" {...getInputProps()} />
                            {isDragActive ? <span className="font-semibold">Suelta tus archivos aquí</span> : (
                                <h4> <span className="font-semibold">Haz click para subir un archivo</span> o arrastra y suelta aquí </h4>
                            )}
                        </p>
                        <p className="text-xs text-gray-500">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                </div>
            )}
            {files.length !== 0 && (
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <div className="w-full"><img src={images} alt="preview" className="object-cover" /></div>
                    <p className="text-green-500 text-xs italic">Se ha cargado correctamente el archivo {fileName} <h3 onClick={() => setFiles([])} className="hover:text-lime-700">Elegir uno nuevo</h3></p>
                </div>
            )}
        </div>
    )
}

export default Upload

