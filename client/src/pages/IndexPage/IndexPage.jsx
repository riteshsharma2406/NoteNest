
import NavIndex from './NavIndex'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'
import About from './About'

const IndexPage = () => {
  return (
    <div>
      <NavIndex/>
      <div id="home">
        <Hero/>
      </div>
      <div id='feature'>
        <Features/>
      </div>
      <div id='about'>
        <About/>
      </div>
        <Footer/>
    </div>
  )
}

export default IndexPage
