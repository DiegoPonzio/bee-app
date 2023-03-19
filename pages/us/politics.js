import Layout from "../../components/Layout"
import Poli from "../../components/Politicas"
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer"

export default function Politicas() {
    return (
        <>
            <Layout title="Políticas" />
            <NavBar />
            <div className="py-10 px-10 pt-28">
                <Poli />
                {/* <Footer /> */}
            </div>
        </>

    )
}

