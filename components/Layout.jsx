import Head from "next/head";

export default function Layout({ title = 'Componente Recetas' }) {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="componente recetas - Diego Ruiz Ponzio" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )

}