import Layout from "../components/Layout"
import Banner404 from "../components/Banners/Banner";

export default function FourOhFour() {
    return (
        <>
            <Layout title="Página no encontrada" />
            <div className="place-content-center bg-amber-200 min-h-screen flex items-center justify-center">
                <Banner404 err4={true} />
            </div>
        </>
    )
}