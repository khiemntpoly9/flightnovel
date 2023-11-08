import DefaultLayout from '@/Layouts/DefaultLayout';
import Comment from '@/Components/Comment';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment/moment';

const TeamNovel = ({ auth, novel_main, vol, follow, rating, comments, status }) => {
	const { errors } = usePage().props;
	const [values, setValues] = useState({
		select: novel_main.novel.is_publish,
		status: novel_main.novel.status,
	});
	// Handle change input
	const handleChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setValues((values) => ({
			...values,
			[key]: value,
		}));
		changePublic(value);
		statusPunblic(value);
	};
	// Change status publish
	const changePublic = (value) => {
		router.post(`/team/novel/${novel_main.novel.slug}/public`, { value });
	};
	// Change status
	const statusPunblic = (value) => {
		router.post(`/team/novel/${novel_main.novel.slug}/status`, { value });
	};
	// lấy status
	let getStatus = null;
	switch (novel_main.novel.status) {
		case 1:
			getStatus = 'Đang tiến hành';
			break;
		case 2:
			getStatus = 'Hoàn thành';
			break;
		case 3:
			getStatus = 'Tạm ngưng';
			break;
		default:
			getStatus = null;
	}
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
								<img src={novel_main.novel.thumbnail} alt='thumb' className='rounded' />
							</div>
							<div className='col-span-4 sm:col-span-3'>
								{/* name */}
								<span className='text-2xl font-semibold'>{novel_main.novel.name_novel}</span>
								{/* category */}
								<div className='mt-2 flex gap-2'>
									{novel_main.categories.map((category) => (
										<Link
											key={category.categories.id}
											className='rounded-full bg-slate-500 px-3 py-2 text-white hover:bg-slate-400'
											href='#'
										>
											{category.categories.name}
										</Link>
									))}
								</div>
								{/* author */}
								<div className='mt-2'>
									<p className='font-semibold'>
										Tác giả: {''}
										<a className='font-medium' href='#'>
											{novel_main.novel.author}
										</a>
									</p>
								</div>
								{/* status */}
								<div className='mt-2'>
									<p className='font-semibold'>
										Tình trạng: {''}
										<span className='font-medium'>{getStatus}</span>
									</p>
								</div>
								{/* read */}
								<div className='mt-2 flex flex-row justify-center gap-1 md:justify-start'>
									<Link
										href={`/team/novel/${novel_main.novel.slug}/create-vol`}
										className='rounded-full	bg-header-a p-2 text-center text-white hover:bg-orange-400'
									>
										Thêm vol
									</Link>
									<Link
										href={`/team/novel/${novel_main.novel.slug}/edit`}
										className='rounded-full	bg-header-a p-2 text-center text-white hover:bg-orange-400'
									>
										Chỉnh sửa chi tiết truyện
									</Link>
								</div>
								{/* public */}
								<div className='mt-2 flex gap-2'>
									<div className=''>
										<select
											id='select'
											value={values.select}
											onChange={handleChange}
											className='select select-accent select-sm mt-1 w-32 max-w-xs md:select-md'
										>
											<option value={0}>Ẩn</option>
											<option value={1}>Công khai</option>
										</select>
									</div>
									<div className=''>
										<select
											id='status'
											value={values.status}
											onChange={handleChange}
											className='w-34 select select-accent select-sm mt-1 max-w-xs md:select-md'
										>
											<option value={1}>Đang tiến hành</option>
											<option value={2}>Hoàn thành</option>
											<option value={3}>Tạm ngưng</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						{/* Container 2 -  */}
						<div className='grid grid-cols-4 border-b-2 py-3'>
							<div className='text-center'>
								Số lượt xem <br /> {novel_main.views.views}
							</div>
							<div className='text-center'>
								{rating.count ? (
									<>
										Đánh giá <br /> {rating.average}/10
									</>
								) : (
									<>
										Đánh giá <br /> Chưa có đánh giá
									</>
								)}
							</div>
							<div className='text-center'>
								Số lượt theo dõi <br /> {follow.count}
							</div>
							<div className='text-center'>
								Số lượt bình luận <br /> {comments.total}
							</div>
						</div>
						{/* Container 3 */}
						<div className='grid grid-cols-1 border-b-2 py-3'>
							<span>
								Tên khác: {novel_main.detail.another_name ? novel_main.detail.another_name : <>Không có</>}
							</span>
						</div>
						<div className='grid grid-cols-1 py-3'>
							<span>
								Tóm tắt:{' '}
								<span
									dangerouslySetInnerHTML={{
										__html: `${novel_main.detail.summary ? novel_main.detail.summary : <>Không có</>}`,
									}}
								></span>
							</span>
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
								<div>
									<Link
										href={`/team/novel/${novel_main.novel.slug}/${vol.slug}/create-chap`}
										className='rounded-full	bg-header-a p-2 text-white hover:bg-orange-400'
									>
										Thêm chap
									</Link>
									<Link
										className='rounded-full	bg-header-a p-2 text-white hover:bg-orange-400'
										href={`/team/novel/${novel_main.novel.slug}/${vol.slug}/edit`}
									>
										Chỉnh sửa
									</Link>
									<button
										className='rounded-full	bg-header-a p-2 text-white hover:bg-orange-400'
										onClick={() => document.getElementById(`modal_delete_vol_${vol.id}`).showModal()}
									>
										Xoá chương
									</button>
									<dialog id={`modal_delete_vol_${vol.id}`} className='modal'>
										<div className='modal-box'>
											<form method='dialog'>
												<button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
											</form>
											<h3 className='text-lg font-bold'>Xoá chương!</h3>
											<p className='py-4 text-base font-normal'>Bạn có chắc muốn xoá chương {vol.title}?</p>
											<p className='py-4 text-base font-normal'>
												Đồng nghĩa với việc bạn sẽ xoá tất cả các chap trong chương này!
											</p>
											<div className='modal-action'>
												<form method='dialog'>
													<button
														onClick={() => {
															router.delete(`/team/novel/${novel_main.novel.slug}/${vol.slug}/delete`);
														}}
														className='btn mr-2 bg-red-600 text-white hover:bg-red-500'
													>
														Xoá
													</button>
													<button className='btn'>Đóng</button>
												</form>
											</div>
										</div>
									</dialog>
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
													className='text-orange-300 hover:text-orange-500'
													href={`/team/novel/${novel_main.novel.slug}/${vol.slug}/${chap.slug}/edit`}
												>
													Chỉnh sửa
												</Link>
												<button
													className='text-red-300 hover:text-red-500'
													onClick={() => document.getElementById(`modal_delete_${chap.id}`).showModal()}
												>
													Xoá
												</button>
												<dialog id={`modal_delete_${chap.id}`} className='modal'>
													<div className='modal-box'>
														<form method='dialog'>
															<button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
																✕
															</button>
														</form>
														<h3 className='text-lg font-bold'>Xoá chap!</h3>
														<p className='py-4 text-base font-normal'>
															Bạn có chắc muốn xoá chap {chap.title}?
														</p>
														<div className='modal-action'>
															<form method='dialog'>
																<button
																	onClick={() => {
																		router.delete(
																			`/team/novel/${novel_main.novel.slug}/${vol.slug}/${chap.slug}/delete`
																		);
																	}}
																	className='btn mr-2 bg-red-600 text-white hover:bg-red-500'
																>
																	Xoá
																</button>
																<button className='btn'>Đóng</button>
															</form>
														</div>
													</div>
												</dialog>
												<Link
													className='text-lime-500 hover:text-orange-500'
													href={`/novel/${novel_main.novel.slug}/${vol.slug}/${chap.slug}`}
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
				<Comment novel={novel_main.novel} comments={comments} user={auth.user} error={errors} />
			</div>
		</DefaultLayout>
	);
};

export default TeamNovel;
