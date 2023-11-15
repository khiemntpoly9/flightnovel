import React from 'react';
import { Link } from '@inertiajs/react';
const ViewMonth = ({ viewmonth }) => {
	return (
		<div className='relative grid grid-cols-3 gap-2 py-2 lg:grid-cols-4 xl:grid-cols-5'>
			{viewmonth[2].map((viewmonth, index) => (
				<div key={index} className='card bg-base-100 shadow-xl'>
					<figure className='h-40 md:h-44 lg:h-40 xl:h-44'>
						<img className='h-full w-full object-cover' src={viewmonth.novel.thumbnail} alt='thumbnail' />
					</figure>
					<div className='p-2 text-center'>
						<Link href={`/novel/${viewmonth.novel.slug}`}>{viewmonth.novel.name_novel}</Link>
					</div>
					<div className='p-2 text-left'> Số lượt xem: {viewmonth.daily_views}</div>
				</div>
			))}
		</div>
	);
};

export default ViewMonth;
