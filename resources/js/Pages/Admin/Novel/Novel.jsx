import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';

const Novel = () => {
	return (
		<AdminLayout>
			<div className='new_LN  w-full py-6  '>
				<div className='h-7 w-full'>
					<h1 className='text-center text-xl uppercase text-black md:text-5xl '>Truyện</h1>
				</div>
				<div className='p-2'>
					<div className='mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 md:mt-12 lg:grid-cols-6'>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
								className=''
							/>
							<div className='name '>
								<h2 className='text-center font-bold  uppercase'>konosuba</h2>
							</div>
						</div>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2 className='text-center font-bold  uppercase'>konosuba</h2>
							</div>
						</div>
						<div className='card'>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2 className='text-center font-bold  uppercase'>konosuba</h2>
							</div>
						</div>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2 className='text-center font-bold  uppercase'>konosuba</h2>
							</div>
						</div>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2 className='text-center font-bold  uppercase'>konosuba</h2>
							</div>
						</div>
						<div className='card '>
							<img
								src='https://m.media-amazon.com/images/M/MV5BNDNiOWM5NGItNzY4NC00MDg1LTljZjctYzViNmRlOTNhOWM2XkEyXkFqcGdeQXVyNjc3OTE4Nzk@._V1_FMjpg_UX1000_.jpg'
								alt=''
							/>
							<div className='name'>
								<h2 className='text-center font-bold  uppercase'>konosuba</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default Novel;
