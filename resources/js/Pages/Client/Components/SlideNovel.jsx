import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from '@inertiajs/react';
export default function SlideNovel({ novels_1 }) {
	const [arrNovel, setArrNovel] = useState(novels_1.data);
	arrNovel.sort(function () {
		return 0.5 - Math.random();
	});
	const arrNovelRandom = arrNovel.slice(0, 4);
	return (
		<>
			<div className='top relative h-7 w-96'>
				<h1 className='font-bold uppercase text-black underline'>Truyện ngẫu nhiên</h1>
			</div>

			<Swiper
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination]}
				className='mySwiper'
			>
				{arrNovelRandom.map((novel_1, index) => (
					<SwiperSlide key={index}>
						<Link href={`/novel/${novel_1.slug}`}>
							<div className='shadow-md'>
								<div className='flex h-52 gap-3 rounded-md border p-1 lg:h-72'>
									{/* thumbnail */}
									<div className='thumbnail w-4/12 '>
										<img className='h-full w-full object-contain' src={novel_1.thumbnail} alt='' />
									</div>
									{/* content */}
									<div className='content w-8/12'>
										<div className='title text-xl font-semibold uppercase'>{novel_1.name_novel}</div>
										<div className='author'>{novel_1.author}</div>
										<div className='description'>{novel_1.description}</div>
									</div>
								</div>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
