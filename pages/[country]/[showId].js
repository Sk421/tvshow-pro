import axios from 'axios';
import Error from 'next/error';

import Cast from '../../components/Cast';
import {
	withAuthorization,
	withAuthServerSideProps,
} from '../../utils/withAuthorization';
// import CustomError from '../_error';

const ShowDetails = ({
  show = {},
  statusCode,
}) => {
  if (statusCode) {
    return (
      <Error
        statusCode={statusCode}
      />
    );
  };
  const {
    name,
    image,
    summary,
    _embedded,
  } = show;
  return (
    <>
      <div className="show-details">
        <div
          className="show-details__poster"
          style={{ backgroundImage: `url(${image.original})` }}
        ></div>
        <h1>{name}</h1>
        <div dangerouslySetInnerHTML={{ __html: summary }}></div>
        {
          _embedded.cast.length > 0 &&
          <Cast cast={_embedded.cast} />
        }
        <style jsx>{`
        .show-details__poster {
          height: 200px;
          background-size: cover;
        }
      `}</style>
      </div>
    </>
  );
};

const getComponentServerSideProps = async (props) => {
  try {
    const { showId } = props.query;
    const res = await axios.get(`http://api.tvmaze.com/shows/${showId}?embed=cast`);
    return {
      props: {
        show: res.data,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      props: {
        statusCode: error.response ? error.response.status : 500,
      },
    };
  }
}

export const getServerSideProps = withAuthServerSideProps(
	getComponentServerSideProps
);

export default withAuthorization(ShowDetails);