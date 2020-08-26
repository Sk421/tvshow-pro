import Router from "next/router";
import nookies from 'nookies';
import styles from '../styles/Home.module.css'

const Home = () => null;

export function getServerSideProps(context) {
  const { defaultCountry } = nookies.get(context);
  const country = context.query.country || defaultCountry || 'us';
  process.browser ?
    // For client side
    Router.replace('/[country]', `${country}`) :
    // When server tries to redirect, it has to write head.
    // 302 is status code for redirect.
    context.res.writeHead(302, { Location: `/${country}` });

  // To tell server, we are done with processing.
  // Otherwise, server will go on.
  context.res.end();
  return {
    props: {},
  };
}

export default Home;