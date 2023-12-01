import { Link } from '@inertiajs/react';
export default function TruyenMoi({ novels }) {
	return (
		<div className='new_LN relative w-full'>
			<div className='top relative flex h-7 w-full justify-between'>
				<h1 className='title-main'>Truyện mới</h1>
				<Link
					href={route('novel.list')}
					className='mb-2 inline-flex items-center justify-center rounded-md bg-orange-400 px-6 py-3 text-sm text-white hover:bg-orange-300 sm:mb-0 sm:w-auto'
					data-primary='green-400'
					data-rounded='rounded-2xl'
					data-primary-reset='{}'
				>
					Xem thêm
					<svg
						className='ml-1 h-4 w-4'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
							clipRule='evenodd'
						></path>
					</svg>
				</Link>
			</div>
			<div className='mt-2'>
				<div className='bottom grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'>
					{novels.data.map((novel) => (
						<div key={novel.id} className='card bg-base-100 shadow-xl'>
							<figure className='h-40 md:h-44 lg:h-40 xl:h-44'>
								<img className='h-full w-full object-cover' src={novel.thumbnail} alt='thumbnail' />
							</figure>
							<div className='p-2 text-center'>
								<Link href={`/novel/${novel.slug}`} className='hover:text-red-500'>
									{novel.name_novel}
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
