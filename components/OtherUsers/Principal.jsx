import styles from '../../styles/Index.module.css'
import Link from 'next/link'
import Layout from '../Layout'


export default function Principal() {
    /*
    <div className={styles.container}>
            <Layout title='BEE +' />
            <nav className={styles.nav}>
                <ul>
                    <li><Link href="/us/nosotros" legacyBehavior>Contáctanos</Link></li>
                    <li><Link href="/us/politics" legacyBehavior>Políticas</Link></li>
                </ul>
            </nav>
            <div className={styles.textBox}>
                <h1 className='bg'>BEE+</h1>
                <h3>¡Encuentra toda la información publicada por tu CECyT en un mismo lugar!</h3>
                <h4>Bee recolecta información publicada por las instituciones educativas de Nivel Medio Superior <br /> del IPN en los diferentes medios de difusión que se utilizan, para facilitar su conocimiento y acceso. </h4>
                <div className={styles.row}>
                    <Link href="/principal/cecyts" legacyBehavior><a>Entra a Bee <span>&#x21e2;</span></a></Link>
                </div>
            </div>
        </div>
    * */

    return (
        <div className='grid h-screen w-full grid-cols-2 overflow-hidden'>
            <div className='flex h-full w-full flex-col justify-center gap-10 bg-[#FCE155] p-10'>
                <div>
                    <h1 className='text-8xl font-bold'>BEE</h1>
                    <h2 className='text-7xl font-bold'>ASSISTANT +</h2>
                </div>
                <p className='text-2xl'>
                    Bee es el asistente que necesitas para enterarte sobre todos los
                    comunicados y eventos que tu escuela realiza.
                </p>
                <a className='flex w-1/3 rounded-lg bg-[#F6F6C1] py-2 text-xl justify-center items-center' href="/principal/cecyts">
                    Entrar a BEE
                </a>
            </div>
            <div className='flex h-full w-full items-center bg-black'>
                <div className='border-l-[25vh] border-t-[50vh] border-b-[50vh] border-l-[#FCE155] border-t-transparent border-b-transparent' />
                <div className='flex h-full w-full flex-col items-center gap-10 p-10 '>
                    <nav className='flex w-full justify-end gap-3'>
                        <a
                            href=''
                            className='w-1/5 border-b-2 border-[#FCE155] text-center  text-white'
                        >
                            Log in
                        </a>
                        <a
                            href=''
                            className='w-1/5 border-b-2 border-[#FCE155] text-center  text-white'
                        >
                            Politicas
                        </a>
                        <a
                            href=''
                            className='w-1/5 border-b-2 border-[#FCE155] text-center  text-white'
                        >
                            Conocenos
                        </a>
                    </nav>
                    <div className='flex h-full w-full items-center justify-center '>
                        <div className='flex h-4/5 w-2/3 flex-col justify-center gap-2 rounded-md border-2 p-14'>
                            <h4 className='text-3xl font-bold text-white'>Dar a informar</h4>
                            <p className='text-2xl text-white'>
                                Bee se encarga de informar a toda la comunidad sobre los eventos
                                mas importantes dentro de tu CECyT
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
