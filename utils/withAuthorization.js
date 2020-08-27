import cookies from 'nookies';
import Router from 'next/router';

const authenticate = context => {
  const { token } = cookies.get(context);
  cookies.set(
    context,
    'plannedRoute',
    JSON.stringify({
      as: context.asPath || `/${context.query.country}/${context.query.showId}`,
      href: context.pathname || '/[country]/[showId]',
    }),
    { path: '/' }
  );
  // ssr validation
  if (context.req && !token) {
    console.log('server side')
    context.res.writeHead(302, { Location: '/signin' });
    context.res.end();
    return {};
  }
  
  // csr redirection 
  if (!token) {
    console.log('client side')
    Router.push('/signin');
  }

  return token;
};

const isAuthenticated = context => {
  const { token } = cookies.get(context);

  return token;
};

const withAuthorization = WrappedComponent => {
  return (props) => {
    return <WrappedComponent {...props.data} />;
  };
};

const withAuthServerSideProps = getServerSidePropsFunc => {
  return async (context) => {
    const token = authenticate(context);
    const data = await getServerSidePropsFunc(context);

    const resolve = {
      props: {
        data: data.props,
      },
    };
    return token ? { props: { ...resolve.props, token } } : resolve;
  };
};

export { withAuthorization, isAuthenticated, withAuthServerSideProps };