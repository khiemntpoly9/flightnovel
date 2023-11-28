import { Link } from '@inertiajs/react';
export default function LichSuDoc({ historyReadList }) {
	return (
		<div className='history-read relative w-full'>
			<div className='h-30 relative mb-2 flex w-full flex-row items-start justify-start'>
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
								d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
							/>
						</svg>
						Lịch Sử Đọc
					</span>
				</div>
			</div>
			<div className='bottom relative h-96 overflow-x-auto'>
				<div className='overscroll-auto'>
					{historyReadList.data.slice(0, 5).map((item, index) => (
						<div className='mb-2 flex flex-row gap-2' key={index}>
							{/* Thumbnail */}
							<div className='rounded-[12px]lg:w-28 h-[160px] w-4/12'>
								<img
									className='h-full w-full rounded-[12px] object-cover'
									src={item.novel?.thumbnail}
									alt='thumbnail'
								/>
							</div>
							{/* Content */}
							<div className='w-8/12'>
								<Link href={`/novel/${item.nove?.slug}`} className='text-xs sm:text-base lg:text-xl'>
									{item.novel?.name_novel}
								</Link>
								<div>{item.chap?.vol.title}</div>
								<div>
									<Link
										href={`/novel/${item.novel.slug}/${item.chap.vol.slug}/${item.chap.slug}`}
										className='text-xs sm:text-base'
									>
										{item.chap?.title}
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
