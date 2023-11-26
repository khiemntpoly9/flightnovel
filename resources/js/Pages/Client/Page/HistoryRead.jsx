import Pagination from '@/Components/Pagination';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link } from '@inertiajs/react';

export default function HistoryRead({ auth, historyReadList }) {
	return (
		<DefaultLayout auth={auth}>
			<Head title='Lịch sử đọc' />
			<div className='container mx-auto w-10/12'>
				<div>Lịch sử đọc</div>
				<div>
					<div className='bottom grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'>
						{historyReadList.data.map((item, index) => (
							<div key={index} className='card bg-base-100 shadow-xl'>
								<figure className='h-40 md:h-44 lg:h-40 xl:h-44'>
									<img className='h-full w-full object-cover' src={item.novel.thumbnail} alt='thumbnail' />
								</figure>
								<div className='flex flex-col p-2 text-center'>
									<div>
										<Link href={`/novel/${item.novel.slug}`} className='hover:text-red-500'>
											{item.novel.name_novel}
										</Link>
									</div>
									<div>
										<Link
											href={`/novel/${item.novel.slug}/${item.chap.vol.slug}/${item.chap.slug}`}
											className='hover:text-red-500'
										>
											{item.chap.title}
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='mt-3'>
						{historyReadList.links && historyReadList.links.length > 3 && (
							<Pagination links={historyReadList.links} />
						)}
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
