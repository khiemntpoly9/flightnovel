import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
register();
export default function SlideNovel({ novels }) {
	const swiperElRef = useRef(null);
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
				<swiper-slide className='h-full' key={index}>
					<div className=''>
						<div classname='aspect-w-16 aspect-h-9'>
							<img className='h-full w-full object-cover object-center' src={novel.thumbnail} alt='' />
						</div>
						<div className='absolute bottom-0 left-0  right-0 bg-gradient-to-b from-transparent via-gray-600 to-black'>
							<div className='break-words text-center text-lg font-bold text-white'>Konosuba</div>
						</div>
					</div>
				</swiper-slide>
			))}
		</swiper-container>
	);
}
