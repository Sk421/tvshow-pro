import Thumbnail from "../Thumbnail";

const Cast = ({ cast }) => {
  const renderList = () => {
    return cast.map((castItem, index) => {
      const {
        image,
        name,
        id,
      } = castItem.person;
      return (
        <li key={index}>
          <Thumbnail
            imageUrl={(image && image.medium) || undefined}
            caption={name}
            href={`/cast?personId=${id}`}
            as={`/cast/${id}`}
            small
          />
        </li>
      );
    });
  };

  return (
    <div className="cast">
      <h3>Cast</h3>
      <ul className="cast__list">
        {renderList()}
      </ul>

      <style jsx>{`
        .cast__list {
          margin: 0;
          padding:0;
          display: flex;
          overflow-x:scroll;
        }
        .cast__list > :global(li) {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Cast;