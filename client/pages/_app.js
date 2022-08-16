import Layout from '../components/Layout'
import 'antd/dist/antd.css';
import '../styles/globals.css'
import { CartContextProvider } from '../context/CartContext';

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  )
}

export default MyApp
