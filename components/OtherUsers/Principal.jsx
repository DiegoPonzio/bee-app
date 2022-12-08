import styles from '../../styles/Index.module.css'
import Link from 'next/link'
import Layout from '../Layout'


export default function Principal() {

    return (
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
                <h2>¡Encuentra toda la información publicada por tu CECyT en un mismo lugar!</h2>
                <h4>Bee recolecta información publicada por las instituciones educativas de Nivel Medio Superior <br /> del IPN en los diferentes medios de difusión que se utilizan, para facilitar su conocimiento y acceso. </h4>
                <div className={styles.row}>
                    <Link href="/principal/cecyts" legacyBehavior><a>Entra a Bee <span>&#x21e2;</span></a></Link>
                </div>
            </div>
        </div>
    )
}
