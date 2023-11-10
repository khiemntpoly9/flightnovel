import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
register();
export default function SlideNovel({ novels }) {
	const swiperElRef = useRef(null);
	console.log(novels.data);
	useEffect(() => {
		// listen for Swiper events using addEventListener
		swiperElRef.current.addEventListener('swiperprogress', (e) => {
			const [swiper, progress] = e.detail;
			console.log(progress);
		});

		swiperElRef.current.addEventListener('swiperslidechange', (e) => {
			console.log('slide changed');
		});
	}, []);

	return (
		<swiper-container ref={swiperElRef} slides-per-view='4' navigation='true' pagination='true'>
			{novels.data.map((novel, index) => (
				<swiper-slide key={index}>
					<div className='relative flex flex-col items-center'>
						<img className='' src={novel.thumbnail} alt='' />
						<div className='absolute bottom-0 left-0  right-0 bg-gradient-to-b from-transparent via-gray-600 to-black'>
							<div className='break-words text-center text-lg font-bold text-white'>Konosuba</div>
						</div>
					</div>
				</swiper-slide>
			))}
		</swiper-container>
	);
}
