import { Link } from '@inertiajs/react';

export default function TheoDoiNhieu(followed) {
	return (
		<div className='flex h-auto w-full flex-col items-center lg:items-start'>
			<div className='h-30 relative flex w-full flex-row items-start justify-start'>
				<div className='text-md rounded-md bg-orange-400 text-center font-normal text-white md:text-base'>
					<span className='m-2 flex'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1}
							stroke='currentColor'
							className='h-6 w-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0'
							/>
						</svg>
						Theo Dõi Nhiều
					</span>
				</div>
			</div>
			{followed.followed.map((novel, index) => (
				<div key={index} className='lg:w-355 mt-2 flex h-auto w-full gap-3'>
					<div className='w-282 h-20 flex-1 flex-col items-start justify-start gap-3'>
						<div className='flex flex-row'>
							<div className='flex h-7 w-7 items-center justify-center rounded-full bg-orange-400 md:h-8 md:w-8'>
								<div className='text-sm font-normal uppercase text-white  md:text-base'>{index + 1}</div>
							</div>
							<div className='ml-2'>
								<Link className='flex content-center' href={`/novel/${novel.slug}`}>
									<span className='text-xs font-bold uppercase text-black md:text-base'>
										{novel.name_novel}
									</span>
								</Link>
							</div>
						</div>
						<div className='ml-10  mt-2 text-xs font-normal lowercase text-black  md:text-base'>
							{novel.follow_count} Theo dõi
						</div>
					</div>
					<div className=' rounded-[12px]lg:w-28 h-[160px] w-24'>
						<Link href={`/novel/${novel.slug}`}>
							<img src={novel.thumbnail} alt='thumb' className='h-full w-full rounded-[12px] object-cover' />
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}
