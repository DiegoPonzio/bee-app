import Layout from "../components/Layout"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Layout title={"hola"} />
      <NavBar />
      <div className='py-5 px-10'>
        
        <div className="grid gird-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 items-center justify-items-center">
          {/*!posts && <Spinners />*/}
          {/*posts && posts.result && posts.result.map(post => {
            //console.log(bufferToBinaryString(post.pub_media.data))
            return <Cards img={Buffer.from(post.pub_media).toString('base64')} name={post.pub_titulo} body={post.pub_descripcion} date={post.pub_fecha} hour={post.pub_horainicio} place={post.pub_locacion} key={post.pub_id} />
          })*/}
        </div>
        {/*posts && (
          <>
            <br />
            <br />
            <br />
          </>
        )*/}
        <Footer />
      </div>
    </>
  )
}
