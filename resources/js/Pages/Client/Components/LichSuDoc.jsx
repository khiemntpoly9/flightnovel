import { Link } from '@inertiajs/react';
export default function LichSuDoc({ historyReadList }) {
	return (
		<div className='history-read relative w-full'>
			<div className='mb-2'>
				<h1 className='font-bold uppercase text-black'>Truyện vừa đọc</h1>
			</div>
			<div className='bottom relative'>
				{historyReadList.map((item, index) => (
					<div key={index} className='mb-2 flex flex-row gap-2'>
						{/* Thumbnail */}
						<div className='w-3/12'>
							<img
								className='h-32 w-full object-cover object-center md:h-40 lg:h-44'
								src={item.novel.thumbnail}
								alt='thumbnail'
							/>
						</div>
						{/* Content */}
						<div className='w-9/12'>
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
	);
}
