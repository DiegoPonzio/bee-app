import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import NavBar from '../../components/NavBar'
import withSessionCecyt from '../../lib/cecyt'
import { useEffect, useState } from 'react'
import Cards from '../../components/Cards'

const Description = ({ cecyt }) => {
  const router = useRouter()
  const { desc, id } = router.query 
  const { name, carrear } = cecyt
  const [post, setPost] = useState()
  const [error, setError] = useState(false)
  const URL = desc === "De Carrera" ? `https://bee-pruebas.herokuapp.com/api/showAll/byCecyt/${name}/byEspId/${id}` : `https://bee-pruebas.herokuapp.com/api/showAll/byCecyt/${name}/byEsp/${id}`
  const fetchEsp = async () => {
    const fetchEsp = await fetch(URL)
      .then(response => response.json())
      .then(responseJSON => setPost(responseJSON.result))
      .catch(() => setError(true))
  }

  useEffect(() => {
    fetchEsp()
  })

  return (
    <>
      <Layout title={`Comunicados de ${id}`} />
      <NavBar carrear={carrear} />
      <div className='py-5 px-10'>
        <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center justify-items-center">
          {!error && post && post.map(post => (
            <Cards key={id} name={post.pub_titulo} body={post.pub_descripcion} date={post.pub_fecha} hour={post.pub_horainicio} place={post.pub_locacion}></Cards>
          ))}
        </div>
      </div>
      {error && !post && (
        <div className={`p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg col-span-2 text-center`} role="alert">
          <span className="font-medium">Error!!</span> La descripción es demasiado grande un minimo de 300 caracteres
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