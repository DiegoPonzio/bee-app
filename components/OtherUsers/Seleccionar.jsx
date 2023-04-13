import { cecyts } from '../../clientServices/Cecyts'
//import Cecyt from '../../components/OtherUsers/Cecyt'
import axios from "axios";
import Router from "next/router";
import {NotificationManager} from "react-notifications";

export default function Seleccionar() {
    /*
    * <div className="grid grid-cols-1 gap-4 p-16 lg:grid-cols-5 pt-32">
            {cecyts.map((cecyt) => (
                <Cecyt src={cecyt.img} name={cecyt.name} key={cecyt.id} carrear={cecyt.area.DeCarrera} />
            ))}
        </div>
    * */

    const handlerClick = (name, carrear) => {
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
        } else {
            NotificationManager.error('Ocurrió un problema', '¡Error!', 5000)
        }
    }

    return (
        <div
            className='flex min-h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden bg-black py-10 pt-32 pl-5'
            style={{
                backgroundImage:
                    'url(https://media.discordapp.net/attachments/1029606142093045761/1094009184720257085/image.png)',
                backgroundSize: 'cover',
            }}
        >
            <h1 className='text-5xl font-bold text-[#FCE155]'>Selecciona tu CECyT</h1>
            <div className='grid h-2/3 w-5/6 md:grid-cols-6 grid-cols-2'>
                {cecyts.map(({ img, name, area }) => (
                    <div
                        key={name}
                        className='mx-10 my-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl bg-white opacity-80 hover:scale-125 hover:opacity-100 hover:transition-all'
                        onClick={ () => handlerClick(name, area.DeCarrera)}
                    >
                        <img src={img} alt={name} className='h-20 w-20' />
                        <p className=''>{name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}