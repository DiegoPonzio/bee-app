import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import withSessionCecyt from "../lib/cecyt"
import Slider1 from "../components/Slider1"
import { useEffect, useState } from "react"
import Spinners from "../components/Spinners"
import { NotificationContainer } from "react-notifications"
import axios from "axios"
import Cards from "../components/Cards"

export default function Home({ cecyt }) {
  const { carrear, name } = cecyt
  const [posts, setPosts] = useState()
  const [error, setError] = useState(false)
  const URL = `/api/showAll/byCecyt/${name}`

  const fetchPosts = async () => {
    const response = await axios.get(URL)
      .then(setPosts)
      .catch(() => setError(true))
  }

  useEffect( () => {
    fetchPosts()
  })

  return (
    <>
      <Layout title={name} />
      <NavBar carrear={carrear} />
      <NotificationContainer />
      <div className='py-5 px-10'>
        <Slider1 />
        <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center justify-items-center">
          {!posts && !error && <Spinners />}
          {posts && !error && posts.data.result && posts.data.result.map(post => {
            //console.log(bufferToBinaryString(post.pub_media.data))
            return <Cards img={String.fromCharCode(...post.pub_media)} name={post.pub_titulo} body={post.pub_descripcion} date={post.pub_fecha} hour={post.pub_horainicio} place={post.pub_locacion} key={post.pub_id} />
          })}
        </div>
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <span className="font-medium">Lo sentimos!!</span> No encontramos comunicados  
          </div>
        )}
        {posts &&  !error && (
          <>
            <br />
            <br />
            <br />
          </>
        )}
        <Footer />
      </div>
    </>
  )
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