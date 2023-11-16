import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
const View = ({ viewday, viewweek, viewmonth }) => {
	const [viewdays, setViewday] = useState(viewday ? viewday : null);
	const [viewweeks, setViewweek] = useState(viewweek ? viewweek : null);
	const [viewmonths, setViewmonth] = useState(viewmonth ? viewmonth : null);
	const content = (novel, status, index) => (
		<div key={index} className='card bg-base-100 shadow-xl'>
			<figure className='h-40 md:h-44 lg:h-40 xl:h-44'>
				<img className='h-full w-full object-cover' src={novel.novel.thumbnail} alt='thumbnail' />
			</figure>
			<div className='p-2 text-center'>
				<Link href={`/novel/${novel.novel.slug}`}>{novel.novel.name_novel}</Link>
			</div>
			{status == 1 && <div className='p-2 text-center'> {novel.daily_views} lượt xem</div>}
			{status == 2 && <div className='p-2 text-center'> {novel.weekly_views} lượt xem</div>}
			{status == 3 && <div className='p-2 text-center'> {novel.monthly_views} lượt xem</div>}
		</div>
	);

	return (
		<div className='relative grid grid-cols-3 gap-2 py-2 lg:grid-cols-4 xl:grid-cols-5'>
			{viewdays?.map((novel, index) => content(novel, 1, index))}
			{viewweeks?.map((novel, index) => content(novel, 2, index))}
			{viewmonths?.map((novel, index) => content(novel, 3, index))}
		</div>
	);
};

export default View;
