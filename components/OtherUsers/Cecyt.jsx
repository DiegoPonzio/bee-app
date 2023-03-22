import axios from 'axios'
import Router from "next/router";
import { useState } from 'react'

export default function Cecyt({ src, name, carrear }) {
    const [error, setError] = useState(false)

    const handlerClick = e => {
        e.preventDefault()
        //router.push('/api/')
        axios.post('/api/cecyt/setCecyt', {
            name,
            carrear
        }).then(Verify)
    }

    const Verify = (res) => {
        console.log(res);
        const {data} = res
        const {status} = data
        if ( status === 200 ){
            Router.replace("/")
            setError(false)
        } else {
            setError(true)
        }
    }

    return (

        <div className="p-4 rounded-lg cursor-pointer bg-gray-300 hover:bg-amber-200 text-center items-center" onClick={ handlerClick }>
            <img className="h-[7rem] w-[7rem] ml-16 " src={src} alt={name} />
            <h2 className="text-4xl font-sans">{name}</h2>
            {error && (
                <p className="text-red-500 text-xs italic">Ocurrió un problema</p>
            )}
        </div>

    )
}