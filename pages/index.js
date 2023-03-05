import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import withSessionCecyt from "../lib/cecyt"
import { useEffect, useState } from "react"
import Spinners from "../components/Spinners"
import { NotificationContainer } from "react-notifications"
import axios from "axios"
import Cards from "../components/Cards"
import Router from "next/router"

export default function Home({ cecyt }) {

  try {

    const { carrear, name } = cecyt
    const [posts, setPosts] = useState()
    const [error, setError] = useState(false)
    const URL = `/api/showAll/byCecyt/${name}`

    const fetchPosts = async () => {
      const response = await axios.get(URL)
        .then(setPosts)
        .catch(() => setError(true))
    }

    useEffect(() => {
      !posts && fetchPosts()
    }, [posts])

    return (
      <>
        <Layout title={name} />
        <NavBar carrear={carrear} />
        <NotificationContainer />
        <div className='py-5 px-10'>
          {/* <Slider1 /> */}
          <div className="grid gird-cols-1 items-center justify-items-center gap-6">
            {!posts && !error && <Spinners />}
            {posts && !error && posts.data.result && posts.data.result.map(post => {
              //console.log(bufferToBinaryString(post.pub_media.data))
              return <Cards img={String.fromCharCode(...post.pub_media.data)} name={post.pub_titulo} body={post.pub_descripcion} date={post.pub_fecha} hour={post.pub_horainicio} hour2={post.pub_horafinal} place={post.pub_locacion} key={post.pub_id} id={post.pub_id} link={post.pub_fuente} who={post.pub_encargado} />
            })}
          </div>
          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              <span className="font-medium">Lo sentimos😿!!</span> No se encontrarón comunicados en este apartado.
            </div>
          )}
          {posts && !error && (
            <>
              <br />
              <br />
              <br />
            </>
          )}
        </div>
        {/* <Footer /> */}
      </>
    )
  } catch (error) {
    Router.replace("/principal")
  }
}

export const getServerSideProps = withSessionCecyt(async function ({ req, res }) {
  const cecyt = req.session.get("cecyt")

  if (cecyt === undefined) {
    res.setHeader("location", "/principal")
    res.statusCode = 302
    res.end()
    return { props: {} }
  }

  return {
    props: { cecyt: cecyt }
  }

})