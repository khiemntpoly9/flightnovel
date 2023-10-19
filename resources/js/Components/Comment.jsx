import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import moment from 'moment/moment';

export default function Comment({ novel, comments, user, error }) {
	const [values, setValues] = useState({
		id_novel: novel.id,
		content: '',
		parent_id: null,
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
				{comments.length} Bình luận
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
					{comments.map((comment) => (
						<div key={comment.id} className='mt-2'>
							<div className='flex flex-row gap-2'>
								<img className='h-10 w-10 rounded-full object-cover' src={comment.user.avatar} alt='avatar' />
								<div className='flex w-full flex-col rounded border border-cyan-500'>
									<div className='p-2'>
										<div className='flex flex-row gap-2'>
											<span className='font-semibold'>{comment.user.name}</span>
										</div>
										<div className='mt-1'>
											<span dangerouslySetInnerHTML={{ __html: `${comment.content}` }}></span>
										</div>
										{/*  */}
										<div className='mt-1 flex'>
											{/* Trả lời comment */}
											<div className='mr-2 inline-flex'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													strokeWidth={1.5}
													stroke='currentColor'
													className='h-6 w-6'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
													/>
												</svg>
												Trả lời
											</div>
											{/* Xóa commnet */}
											<div>
												{user && user.role.short_role == 'admin' ? (
													<button
														className='mr-2 text-gray-500 hover:text-red-500'
														onClick={() => router.delete(`/comment/${comment.id}/delete`)}
													>
														Xóa
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
					))}
				</div>
			</div>
		</div>
	);
}
