import { cecyts } from '../../clientServices/Cecyts'
import Cecyt from '../../components/OtherUsers/Cecyt'

export default function Seleccionar() {
    return (
        <div className="grid grid-cols-1 gap-4 p-16 lg:grid-cols-5 pt-28">
            {cecyts.map((cecyt) => (
                <Cecyt src={cecyt.img} name={cecyt.name} key={cecyt.id} carrear={cecyt.area.DeCarrera} />
            ))}
        </div>
    )
}