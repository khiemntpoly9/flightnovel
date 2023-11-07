import { Link } from '@inertiajs/react';

export default function TruyenMoi({ novels }) {
	console.log(novels);
	return (
		<div className='new_LN relative w-full'>
			<div className='top relative h-7 w-96'>
				<h1 className='font-bold uppercase text-black'>Truyện mới</h1>
			</div>
			<div className=''>
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
