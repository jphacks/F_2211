import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import "../styles/color.css";
import Header from "../components/Header/Header"

function MyApp({ Component, pageProps }) {
  return <><Header /><Component {...pageProps} /></>;
}

export default MyApp;
