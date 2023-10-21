import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import moment from 'moment/moment';
import Pagination from './Pagination';

export default function Comment({ novel, comments, user, error }) {
	console.log(comments);
	const [values, setValues] = useState({
		id_novel: novel.id,
		content: '',
	});
	// handle change input
	const handleChange = (e) => {
		if (e && e.target && e.target.id) {
			const key = e.target.id;
			const value = e.target.value;
			setValues((values) => ({
				...values,
				[key]: value,
			}));
		}
	};
	// handle submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		router.post('/comment/post', values);
	};
	return (
		<div>
			<span className='inline-flex text-lg'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1}
					stroke='currentColor'
					className='mr-1 h-6 w-6'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
					/>
				</svg>
				{comments.total} Bình luận
			</span>
			{/* Bình luận */}
			<div className='mt-2'>
				<form onSubmit={handleSubmit}>
					{/* CKEditor 5 */}
					<div>
						<CKEditor
							id='content'
							editor={ClassicEditor}
							data={values.content}
							onReady={(editor) => {
								// You can store the "editor" and use when it is needed.
								// console.log('Editor is ready to use!', editor);
							}}
							onChange={(event, editor) => {
								const data = editor.getData();
								handleChange({ target: { id: 'content', value: data } });
							}}
							onBlur={(event, editor) => {
								// console.log('Blur.', editor);
							}}
							onFocus={(event, editor) => {
								// console.log('Focus.', editor);
							}}
						/>
					</div>
					<div className='mt-2 flex justify-between'>
						<div>
							{error && error.content && <p className='text-sm italic text-red-500'>{error.content}</p>}
						</div>
						<button
							type='submit'
							className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none'
						>
							Bình luận
						</button>
					</div>
				</form>
				{/* Show comment */}
				<div>
					{comments.data.map((comment) => (
						<div key={comment.id} className='mt-2'>
							<div className='flex flex-row gap-2'>
								<img className='h-10 w-10 rounded-full object-cover' src={comment.user.avatar} alt='avatar' />
								{/* Show comment */}
								<div className='flex w-full flex-col'>
									<div className='rounded border border-cyan-500'>
										<div className='p-2'>
											<div className='flex flex-row gap-2'>
												<span className='font-semibold'>{comment.user.name}</span>
											</div>
											<div className='mt-1'>
												<span dangerouslySetInnerHTML={{ __html: `${comment.content}` }}></span>
											</div>
											{/*  */}
											<div className='mt-1 flex'>
												{/* Xóa commnet */}
												<div>
													{user && user.role.short_role == 'admin' ? (
														<button
															className='mr-2 text-gray-500 hover:text-red-500'
															onClick={() => router.delete(`/comment/${comment.id}/delete`)}
														>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 24 24'
																strokeWidth={1.5}
																stroke='currentColor'
																className='h-5 w-5'
															>
																<path
																	strokeLinecap='round'
																	strokeLinejoin='round'
																	d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
																/>
															</svg>
														</button>
													) : (
														user &&
														user.id === comment.id_user && (
															<button
																className='mr-2 text-gray-500 hover:text-red-500'
																onClick={() => router.delete(`/comment/${comment.id}/delete`)}
															>
																Xóa
															</button>
														)
													)}
												</div>
												<div>
													<span className='text-xs text-gray-500'>
														{moment(comment.created_at).format('DD/MM/YYYY - HH:mm:ss')}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Pagination links={comments.links} />
		</div>
	);
}
