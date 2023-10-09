import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function TeamChap({ auth, id_novel, id_vol }) {
	const { errors } = usePage().props;
	const [values, setValues] = useState({
		title: '',
		content: '',
	});
	// Handle change input
	const handleChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setValues((values) => ({
			...values,
			[key]: value,
		}));
	};
	// Handle submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		router.post(`/team/novel/${id_novel}/vol/${id_vol}/create-chap`, values);
	};
	return (
		<DefaultLayout auth={auth}>
			<Head title='Thêm chap' />
			<div className='container mx-auto w-10/12'>
				<form onSubmit={handleSubmit}>
					{/* Tên Vol */}
					<div className='mb-2'>
						<label htmlFor='title' className='mb-2 block text-sm font-medium leading-6 text-gray-900'>
							Tên Chap
						</label>
						<div>
							<input
								id='title'
								type='text'
								value={values.title}
								onChange={handleChange}
								className={`${
									errors && errors.title ? 'mb-2 border-rose-600' : ''
								} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
							/>
							{errors && errors.title && <p className='text-sm italic text-red-500'>{errors.title}</p>}
						</div>
					</div>
					<div className='mb-4 flex flex-col'>
						<label className='mb-2'>Nội dung</label>
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
						{errors && errors.content && <p className='text-sm italic text-red-500'>{errors.content}</p>}
					</div>
					<div className='mt-4'>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
						>
							Thêm
						</button>
					</div>
				</form>
			</div>
		</DefaultLayout>
	);
}
