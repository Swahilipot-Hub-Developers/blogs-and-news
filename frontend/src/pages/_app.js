import Layout from '../layout/Layout'
import '../styles/scss/theme.scss'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) 
}

export default MyApp
