import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';
import { Link } from '@inertiajs/react';

const Novel = ( {novels} ) => {
	return (
		<AdminLayout>
			<div className='w-full py-6'>
				<div className='h-7 w-full'>
					<h1 className='text-center text-xl uppercase text-black md:text-5xl'>Truyện</h1>
				</div>
				<div className='p-2'>
					<div className='mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 md:mt-12 lg:grid-cols-6'>
						{novels.map((novel) => (
							<div key={novel.id} className='card bg-base-100 shadow-xl'>
								<figure className='h-40 md:h-44 lg:h-40 xl:h-64'>
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
		</AdminLayout>
	);
};

export default Novel;
