import React from 'react';
import { Link } from '@inertiajs/react';
const ViewWeek = ({ viewweek }) => {
	return (
		<div className='relative grid grid-cols-3 gap-2 py-2 lg:grid-cols-4 xl:grid-cols-5'>
			{viewweek[1].map((viewweek, index) => (
				<div key={index} className='card bg-base-100 shadow-xl'>
					<figure className='h-40 md:h-44 lg:h-40 xl:h-44'>
						<img className='h-full w-full object-cover' src={viewweek.novel.thumbnail} alt='thumbnail' />
					</figure>
					<div className='p-2 text-center'>
						<Link href={`/novel/${viewweek.novel.slug}`}>{viewweek.novel.name_novel}</Link>
					</div>
					<div className='p-2 text-left'> Số lượt xem: {viewweek.daily_views}</div>
				</div>
			))}
		</div>
	);
};

export default ViewWeek;
