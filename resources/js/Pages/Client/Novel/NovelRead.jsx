import DefaultLayout from '@/Layouts/DefaultLayout';
import moment from 'moment/moment';
import Comment from '@/Components/Comment';
import { Link, router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function NovelRead({ auth, novel, vol, follow, comments, status }) {
	const { errors } = usePage().props;
	// Toast
	useEffect(() => {
		// Success
		if (status.success) {
			toast.success(status.success, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		// Error
		if (status.error) {
			toast.error(status.error, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}, [status]);
	return (
		<DefaultLayout auth={auth}>
			<div className='container mx-auto w-10/12'>
				<div className='container mb-3 flex flex-col gap-3 md:flex-row'>
					{/* Info truyện */}
					<div className='mx-auto grid w-full rounded border-2 p-3 md:m-0 '>
						{/* Container 1 */}
						<div className='grid grid-cols-4 gap-3 border-b-2 pb-3'>
							<div className='col-span-4 sm:col-span-1'>
								<img src={novel.thumbnail} alt='thumb' className='rounded' />
							</div>
							<div className='col-span-4 sm:col-span-3'>
								{/* name */}
								<span className='text-2xl font-semibold'>{novel.name_novel}</span>
								{/* category */}
								<div className='mt-2 flex gap-2'>
									<a className='rounded-full bg-slate-500 px-3 py-2 text-white hover:bg-slate-400' href='#'>
										Action
									</a>
									<a className='rounded-full bg-slate-500 px-3 py-2 text-white hover:bg-slate-400' href='#'>
										Action
									</a>
									<a className='rounded-full bg-slate-500 px-3 py-2 text-white hover:bg-slate-400' href='#'>
										Action
									</a>
									<a className='rounded-full bg-slate-500 px-3 py-2 text-white hover:bg-slate-400' href='#'>
										Action
									</a>
								</div>
								{/* author */}
								<div className='mt-2'>
									<p className='font-semibold'>
										Tác giả: {''}
										<a className='font-medium' href='#'>
											{novel.author}
										</a>
									</p>
								</div>
								{/* status */}
								<div className='mt-2'>
									<p className='font-semibold'>
										Tình trạng: {''}
										<span className='font-medium'>Đang tiến hành</span>
									</p>
								</div>

								{/* read */}
								<div className='mt-2 flex flex-row justify-center gap-2 md:justify-start'>
									{follow.status ? (
										<button
											className='rounded-full	bg-header-a p-2 text-white hover:bg-orange-400'
											onClick={() => router.delete(`/follow/${novel.id}`)}
										>
											Đã Theo dõi
										</button>
									) : (
										<button
											className='rounded-full	bg-header-a p-2 text-white hover:bg-orange-400'
											onClick={() => router.post(`/follow/${novel.id}`)}
										>
											Theo dõi
										</button>
									)}
								</div>
							</div>
						</div>
						{/* Container 2 -  */}
						<div className='grid grid-cols-4 border-b-2 py-3'>
							<div className='text-center'>
								Số lượt xem <br /> {novel.views}
							</div>
							<div className='text-center'>
								Số lượt đánh giá <br /> 4.6/5
							</div>
							<div className='text-center'>
								Số lượt theo dõi <br /> {follow.count}
							</div>
							<div className='text-center'>
								Số lượt bình luận <br /> 2589
							</div>
						</div>
						{/* Container 3 */}
						<div className='grid grid-cols-1 border-b-2 py-3'>
							<span>Tên khác: Konosuba</span>
						</div>
						<div className='grid grid-cols-1 py-3'>
							<span>Tóm tắt: Konosuba</span>
						</div>
					</div>
				</div>
				{/* End */}
				{/* Chương */}
				{vol.map((vol) => (
					<div key={vol.id} className='mb-3 w-full rounded border-2'>
						<div className='bg-header-a p-2'>
							<div className='flex flex-row justify-between'>
								<div className='flex items-center'>
									<p className='rounded text-white'>{vol.title}</p>
								</div>
							</div>
						</div>
						<div className='flex gap-2 p-2'>
							<div className='flex w-full flex-col '>
								{vol.chap && vol.chap.length > 0 ? (
									vol.chap.map((chap) => (
										<div key={chap.id} className='flex justify-between p-2 hover:bg-slate-200'>
											<div>{chap.title}</div>
											<div>{moment(chap.created_at).format('DD/MM/YYYY')}</div>
											<div className='flex gap-3'>
												<Link
													className='text-lime-500 hover:text-orange-500'
													href={`/novel/${novel.slug}/${vol.slug}/${chap.slug}`}
												>
													Xem
												</Link>
											</div>
										</div>
									))
								) : (
									<div>
										<span>Chưa có chap</span>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
				<Comment novel={novel} comments={comments} user={auth} error={errors} />
			</div>
		</DefaultLayout>
	);
}
