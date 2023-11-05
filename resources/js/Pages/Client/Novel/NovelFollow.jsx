import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, router, usePage } from '@inertiajs/react';
import moment from 'moment/moment';
export default function NovelFollow({ auth, novel }) {
	console.log(novel);
	return (
		<DefaultLayout auth={auth}>
			<div className='mx-auto w-10/12'>
				{novel && novel.length > 0 ? (
					novel.map((novel) => (
						<div key={novel.id} className='mt-3 flex gap-4 hover:bg-gray-100'>
							<div className=''>
								<Link href={`/novel/${novel.slug}`}>
									<img src={novel.thumbnail} alt='' className='h-36 w-24 p-1 md:h-48 md:w-32' />
								</Link>
							</div>
							<div className='flex flex-col gap-3'>
								<div className='flex flex-col'>
									<Link href={`/novel/${novel.slug}`}>
										<h1 className='text-base font-bold'>{novel.name_novel}</h1>
									</Link>
									<span>Tác giả: {novel.author} </span>
									<span>Cập nhật : {moment(novel.updated_at).format('DD/MM/YYYY - HH:mm:ss')}</span>
								</div>
								<div className=''>
									<button
										className='border border-gray-600 p-1'
										onClick={() => router.delete(`/follow/${novel.id_novel}`)}
									>
										Bỏ theo dõi
									</button>
								</div>
							</div>
						</div>
					))
				) : (
					<div className=''>
						<span>Chưa có truyện theo dõi</span>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
}
