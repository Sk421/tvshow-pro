import axios from 'axios';

const CastDetails = ({ person }) => {
  const {
    birthday,
    gender,
    image = {},
    name,
  } = person;
  return (
    <div>
      {
        image &&
        <img src={image.original} alt={name} />
      }
      <p>Name: {name}</p>
      <p>Gender: {gender}</p>
      <p>Birthday: {birthday}</p>

      <style jsx>{`
        img {
          width: 100px;
        }
      `}</style>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const res = await axios.get(`http://api.tvmaze.com/people/${query.personId}`);
    return {
      props: {
        person: res.data,
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

export default CastDetails;
