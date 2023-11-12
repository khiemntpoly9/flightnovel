import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
export default function SlideNovel({ novels }) {
	const [arrNovel, setArrNovel] = useState(novels.data);
	arrNovel.sort(function () {
		return 0.5 - Math.random();
	});
	const arrNovelRandom = arrNovel.slice(0, 4);
	return (
		<>
			Truyện Ngẫu Nhiên
			<Swiper
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination]}
				className='mySwiper'
			>
				{arrNovelRandom.map((novel, index) => (
					<SwiperSlide key={index}>
						<div className='shadow-md'>
							<div className='flex h-52 gap-3 rounded-md border p-1 lg:h-72'>
								{/* thumbnail */}
								<div className='thumbnail w-4/12 '>
									<img className='h-full w-full object-contain' src={novel.thumbnail} alt='' />
								</div>
								{/* content */}
								<div className='content w-8/12'>
									<div className='title text-xl font-semibold uppercase'>{novel.name_novel}</div>
									<div className='author'>{novel.author}</div>
									<div className='description'>{novel.description}</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
