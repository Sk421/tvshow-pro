import axios from 'axios';
import Error from 'next/error';

import Thumbnail from '../../components/Thumbnail';

const Test = ({ shows, country, statusCode }) => {
	if(statusCode) {
		return (<Error statusCode={statusCode} />);
	}

	const renderShows = () => {
		return shows.map((showItem, index) => {
			const { show } = showItem;
			return (
				<li key={index}>
					<Thumbnail
						imageUrl={(show.image && show.image.medium) || undefined}
						caption={show.name}
						href="/[country]/[showId]"
						as={`/${country}/${show.id}`}
					/>
				</li>
			);
		});
	}

	return (
		<>
			<ul className="tvshows">
				{renderShows()}
			</ul>
		</>
	);
};

export async function getServerSideProps(context) {
	try {
		const country = context.query.country || 'us';
		const res = await axios.get(`https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`);
		return {
			props: {
				shows: res.data,
				country,
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

export default Test;