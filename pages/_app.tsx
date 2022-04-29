import "../styles/globals.css";
import "../styles/bootstrap.css";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Provider } from "react-redux";
import store from "../componentes/react_management/store";
import Layout from "../componentes/layout/Layout";
import { useEffect } from "react";
import {motion} from "framer-motion";
//Use semantic markup, change some divs for navs, sections, mains, etc.

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    import("../node_modules/bootstrap/dist/js/bootstrap");
  }, []);
  const variants = {
    pageInitial: {opacity: 0},
    pageAnimate: {opacity: 1}
  };
  return (
    <Provider store={store}>
      <Layout >
        <motion.div id="motion_div" style={{flexGrow: 1, zIndex: 1}} key={router.asPath} initial="pageInitial" animate="pageAnimate" variants={variants}>
        <Component {...pageProps} />
        </motion.div>
      </Layout>
    </Provider>
  );
}

export default MyApp;
