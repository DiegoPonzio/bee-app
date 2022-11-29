import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import NavBar from '../../components/NavBar'
import withSessionCecyt from '../../lib/cecyt'
import { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import axios from 'axios'

const Description = ({ cecyt }) => {
  const router = useRouter()
  const { desc, id } = router.query 
  const { name, carrear } = cecyt
  const [ esp, setEsp ] = useState("")
  const [ aera, setArea ] = useState("")
  const [post, setPost] = useState()
  const [error, setError] = useState(false)
  const URL = desc === "De Carrera" ? `/api/showAll/byCecyt/${name}/byEspId/${id}` : `/api/showAll/byCecyt/${name}/byEsp/${id}`
  const fetchEsp = async () => {
    const fetchEsp = await axios.get(URL)
      .then(response => {
        setPost(response)
      })
      .catch( () => setError(true))
  }

  useEffect(() => {
    !post && fetchEsp()
  }, [])

  return (
    <>
      <Layout title={`Comunicados de ${id}`} />
      <NavBar carrear={carrear} />
      <div className='py-5 px-10'>
        <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center justify-items-center">
          {!error && post && post.data.result.map(post => (
            <Cards key={id} img={String.fromCharCode(...post.pub_media.data)} name={post.pub_titulo} body={post.pub_descripcion} date={post.pub_fecha} hour={post.pub_horainicio} place={post.pub_locacion}></Cards>
          ))}
        </div>
      </div>
      {error && !post && (
        <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center`} role="alert">
          <span className="font-medium">Error!!</span> No encontramos comunicados 
        </div>
      )}
    </>
  )
}

export default Description

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