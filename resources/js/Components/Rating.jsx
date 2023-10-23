import { useState } from 'react';
import { router } from '@inertiajs/react';
export default function Rating({ novel }) {
	const [values, setValues] = useState({
		id_novel: novel,
		point: 0,
	});
	const buttons = [];
	for (let i = 1; i <= 10; i++) {
		buttons.push(
			<button key={i} className='star' onClick={() => setValues({ ...values, point: i })}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='h-7 w-7'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
					/>
				</svg>
			</button>
		);
	}
	// Submit
	const submitRating = () => {
		router.post('/rating/post', values);
	};
	// Rating
	const stars = document.querySelectorAll('.star');
	stars.forEach((star, index) => {
		star.addEventListener('click', () => {
			stars.forEach((s, i) => {
				const svg = s.querySelector('svg');
				if (i <= index) {
					svg.setAttribute('fill', '#F59E0B');
					svg.setAttribute('stroke', '#F59E0B');
				} else {
					svg.setAttribute('fill', 'none');
					svg.setAttribute('stroke', 'currentColor');
				}
			});
			for (let i = 0; i < index; i++) {
				const previosStar = stars[i];
				previosStar.querySelector('svg').setAttribute('fill', '#F59E0B');
				previosStar.querySelector('svg').setAttribute('stroke', '#F59E0B');
			}
		});
	});
	return (
		<div className='flex flex-col gap-1'>
			{/* Star */}
			<div className='text-center text-5xl'>{values.point}</div>
			<div>{buttons}</div>
			{/* Button rate submit */}
			<div>
				<div className='flex justify-center'>
					<button className='btn m-0 bg-sky-400 text-white hover:bg-sky-300' onClick={() => submitRating()}>
						Đánh giá
					</button>
				</div>
			</div>
		</div>
	);
}
