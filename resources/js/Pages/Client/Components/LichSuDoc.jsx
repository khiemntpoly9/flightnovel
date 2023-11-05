import { Link } from '@inertiajs/react';
export default function LichSuDoc({ historyReadList }) {
	return (
		<div className='history-read relative w-full py-6'>
			<div className='top relative h-7 w-96'>
				<h1 className='font-bold uppercase text-black'>Truyện vừa đọc</h1>
			</div>
			<div className='bottom relative'>
				{historyReadList.map((item, index) => (
					<div key={index} className='mb-2 flex flex-row gap-2'>
						<div className='aspect-w-16 aspect-h-9'>
							<img
								className='h-full w-full object-cover object-center'
								src={item.novel.thumbnail}
								alt='thumbnail'
							/>
						</div>
						<div>
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
