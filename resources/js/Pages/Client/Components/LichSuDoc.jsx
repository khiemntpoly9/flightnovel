import { Link } from '@inertiajs/react';
export default function LichSuDoc({ historyReadList }) {
	return (
		<div className='history-read relative w-full'>
			<div className='lg:w-356 h-30 relative flex w-full flex-row items-start justify-start'>
				<div className='h-30 w-20 bg-gray-300'>
					<div className='break-words py-2 text-center text-sm font-normal text-black  md:text-base'>
						Lịch Sử
					</div>
				</div>
				<div className='break-words px-2 py-2 text-sm font-bold uppercase text-black underline  md:text-base'>
					Đọc
				</div>
			</div>
			<div className='bottom relative h-96 overflow-x-auto'>
				<div className='overscroll-auto'>
					{historyReadList.slice(0, 5).map((item, index) => (
						<div className='mb-2 flex flex-row gap-2' key={index}>
							{/* Thumbnail */}
							<div className='rounded-[12px]lg:w-28 h-[160px] w-4/12'>
								<img
									className='h-full w-full rounded-[12px] object-cover'
									src={item.novel.thumbnail}
									alt='thumbnail'
								/>
							</div>
							{/* Content */}
							<div className='w-8/12'>
								<Link href={`/novel/${item.novel.slug}`} className='text-xs sm:text-base lg:text-xl'>
									{item.novel.name_novel}
								</Link>
								<div>{item.chap.vol.title}</div>
								<div>
									<Link
										href={`/novel/${item.novel.slug}/${item.chap.vol.slug}/${item.chap.slug}`}
										className='text-xs sm:text-base'
									>
										{item.chap.title}
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
