const CustomError = ({ statusCode }) => {
  console.log('statuscode ', statusCode);
  if(statusCode === 404) {
    return <h1>Resource not found...</h1>
  }
  return (
    <h1>Something went wrong...</h1>
  );
};

// res here means server side.
// err means client side.
export function getServerSideProps({ err, res }) {
  return {
    props: {
      statusCode: res ? res.statusCode : err ? err.statusCode : 400,
    },
  }
}

export default CustomError;