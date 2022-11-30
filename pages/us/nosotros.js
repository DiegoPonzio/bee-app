import NavBar from "../../components/NavBar"
import Conoce from "../../components/Conoce"
import Footer from "../../components/Footer"
import Slider1 from "../../components/Slider1"
import Layout from "../../components/Layout"
import Estrategias from '../../components/Estrategias'

export default function Nosotros () {
  return (
    <>
      <Layout title="Conócenos" />
      <NavBar />
      <div className="py-5 px-5">
        <Conoce />
        <Slider1 />
        <Estrategias/>
      </div>
      <Footer />

    </>
  )
}

