import Link from 'next/link';

import styles from './Thumbnail.module.scss';

const Thumbnail = ({
  imageUrl = 'https://via.placeholder.com/150x150?text=?',
  caption,
  href = '',
  as = '',
  small = false,
}) => {
  return (
    <div className="thumbnail">
      <Link href={href} as={as}>
        <a>
          <img
            src={imageUrl}
            className={`${small && styles['thumbnail__image--small']} ${styles.thumbnail__image}`}
            alt=""
          />
          <h4 className={styles.thumbnail__caption}>{caption}</h4>
        </a>
      </Link>
    </div>
  );
}

export default Thumbnail;