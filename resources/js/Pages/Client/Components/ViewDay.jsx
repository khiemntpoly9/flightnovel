import { Link } from '@inertiajs/react';
import React from 'react';

const ViewDay = ({ viewday }) => {
	return (
		<div className='lg:w-356 lg:h-374 flex h-auto w-full flex-col items-center py-6 lg:items-start'>
			<div className='lg:w-356 h-30 relative flex w-full flex-row items-start justify-start'>
				<div className='h-30 w-20 bg-gray-300'>
					<div className='break-words py-2 text-center text-sm font-normal text-black  md:text-base'>
						Top lượt xem
					</div>
				</div>
				<div className='break-words px-2 py-2 text-sm font-bold uppercase text-black underline  md:text-base'>
					trong ngày
				</div>
			</div>

			{viewday[0].map((viewday, index) => (
				<div key={index} className='lg:w-355 mt-2 flex h-auto w-full gap-3'>
					<div className='w-282 h-20 flex-1 flex-col items-start justify-start gap-3'>
						<div className='flex flex-row '>
							<div className='w-31 h-31 flex items-center justify-center rounded-full bg-gray-300 px-3 py-0 md:h-8 md:w-10 lg:w-8'>
								<div className='text-sm font-normal uppercase text-black  md:text-base'>{index + 1}</div>
							</div>

							<div className='ml-2'>
								<Link href={`/novel/${viewday.novel.slug}`}>
									<div className='text-xs font-bold uppercase text-black   md:text-base'>
										{viewday.novel.name_novel}
									</div>
								</Link>
							</div>
						</div>
						<div className='ml-10  mt-2 text-xs font-normal lowercase text-black  md:text-base'>
							{viewday.daily_views} lượt xem
						</div>
					</div>
					<div className=' rounded-[12px]lg:w-28 h-[160px] w-24'>
						<Link href={`/novel/${viewday.novel.slug}`}>
							<img
								src={viewday.novel.thumbnail}
								alt='thumb'
								className='h-full w-full rounded-[12px] object-cover'
							/>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default ViewDay;
