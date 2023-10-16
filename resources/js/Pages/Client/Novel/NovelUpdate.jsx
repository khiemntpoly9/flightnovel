import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function NovelUpdate({ auth, categories, novel, detail }) {
	const { errors } = usePage().props;
	const [values, setValues] = useState({
		name_novel: novel.name_novel,
		another_name: detail.another_name,
		author: novel.author,
		illustrator: novel.illustrator,
		categories: [],
		summary: detail.summary,
		note: novel.note,
	});

	const [selectedFile, setSelectedFile] = useState(null);
	// Handle change input
	const handleChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setValues((values) => ({
			...values,
			[key]: value,
		}));
	};
	// Handle change checkbox
	const handleCheckbox = (e) => {
		const cateId = e.target.id;
		const isChecked = e.target.checked;

		// Lấy mảng categories hiện tại
		const updateCategories = [...values.categories];

		if (isChecked) {
			// Nếu được check thì thêm id đó vào mảng
			updateCategories.push(cateId);
		} else {
			// Nếu không được check thì xóa id đó trong mảng
			const index = updateCategories.indexOf(cateId);
			if (index !== -1) {
				updateCategories.splice(index, 1);
			}
		}
		setValues((values) => ({
			...values,
			categories: updateCategories,
		}));
	};
	// Handle submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('name_novel', values.name_novel);
		formData.append('another_name', values.another_name);
		formData.append('author', values.author);
		formData.append('illustrator', values.illustrator);
		formData.append('categories', values.categories);
		formData.append('summary', values.summary);
		formData.append('note', values.note);
		formData.append('thumbnail', selectedFile);
		router.patch(`/team/novel/${novel.slug}/update`, formData);
		console.log(values);
	};
	return (
		<DefaultLayout auth={auth}>
			<Head title='Novel' />
			<div className='container mx-auto w-10/12 bg-white'>
				<div className='flex min-h-full flex-1 flex-col justify-center lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							Sửa thông tin truyện
						</h2>
					</div>
					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-md'>
						<form onSubmit={handleSubmit} encType='multipart/form-data'>
							{/* Tên truyện */}
							<div className='mb-2'>
								<label
									htmlFor='name_novel'
									className='mb-2 block text-sm font-medium leading-6 text-gray-900'
								>
									Tên truyện
								</label>
								<div>
									<input
										id='name_novel'
										type='text'
										value={values.name_novel}
										onChange={handleChange}
										className={`${
											errors && errors.name_novel ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									/>
									{errors && errors.name_novel && (
										<p className='text-sm italic text-red-500'>{errors.name_novel}</p>
									)}
								</div>
							</div>
							{/* Tên khác */}
							<div className='mb-2'>
								<div className='mb-2 flex items-center justify-between'>
									<label htmlFor='another_name' className='block text-sm font-medium leading-6 text-gray-900'>
										Tên khác
									</label>
								</div>
								<div className='mb-2'>
									<input
										id='another_name'
										type='text'
										value={values.another_name}
										onChange={handleChange}
										className={`w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									/>
								</div>

								{/* Tác giả */}
								<div className='mb-2 flex items-center justify-between'>
									<label htmlFor='author' className='block text-sm font-medium leading-6 text-gray-900'>
										Tác giả
									</label>
								</div>
								<div className='mb-2'>
									<input
										id='author'
										type='text'
										value={values.author}
										onChange={handleChange}
										className={`${
											errors && errors.author ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									/>
									{errors && errors.author && <p className='text-sm italic text-red-500'>{errors.author}</p>}
								</div>

								{/* Họa sĩ */}
								<div className='mb-2 flex items-center justify-between'>
									<label htmlFor='illustrator' className='block text-sm font-medium leading-6 text-gray-900'>
										Họa sĩ
									</label>
								</div>
								<div className='mb-2'>
									<input
										id='illustrator'
										type='text'
										value={values.illustrator}
										onChange={handleChange}
										className={`${
											errors && errors.illustrator ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									/>
									{errors && errors.illustrator && (
										<p className='text-sm italic text-red-500'>{errors.illustrator}</p>
									)}
								</div>
							</div>
							{/* Thể loại */}
							<div className='mb-2 flex items-center justify-between'>
								<span className='block text-sm font-medium leading-6 text-gray-900'>Thể loại</span>
							</div>
							<div className='mb-2 flex flex-wrap items-center'>
								{categories.map((category) => (
									<div key={category.id} className='mb-2 w-1/2 md:mb-0 md:flex md:w-1/3'>
										<input
											className='mr-1'
											type='checkbox'
											name='categories'
											id={category.id}
											onChange={handleCheckbox}
										/>
										<label
											htmlFor={category.id}
											className='block text-sm font-medium leading-6 text-gray-900'
										>
											{category.name}
										</label>
									</div>
								))}
							</div>
							{errors && errors.categories && (
								<p className='text-sm italic text-red-500'>{errors.categories}</p>
							)}
							{/* Tóm tắt */}
							<div className='mb-2 flex items-center justify-between'>
								<label className='block text-sm font-medium leading-6 text-gray-900'>Tóm tắt</label>
							</div>
							<div className='mb-2'>
								<div>
									<CKEditor
										id='summary'
										editor={ClassicEditor}
										data={values.summary}
										onReady={(editor) => {
											// You can store the "editor" and use when it is needed.
											// console.log('Editor is ready to use!', editor);
										}}
										onChange={(event, editor) => {
											const data = editor.getData();
											handleChange({ target: { id: 'summary', value: data } });
										}}
										onBlur={(event, editor) => {
											// console.log('Blur.', editor);
										}}
										onFocus={(event, editor) => {
											// console.log('Focus.', editor);
										}}
									/>
								</div>
								{errors && errors.summary && <p className='text-sm italic text-red-500'>{errors.summary}</p>}
							</div>
							{/* Thumbnail */}
							<div className='mb-2 flex items-center justify-between'>
								<label className='block text-sm font-medium leading-6 text-gray-900'>Thumbnail</label>
							</div>
							<div className='mb-2'>
								<input
									type='file'
									className='file-input file-input-bordered mt-1 w-full max-w-xs'
									onChange={(e) => setSelectedFile(e.target.files[0])}
								/>
								{errors && errors.thumbnail && (
									<p className='text-sm italic text-red-500'>{errors.thumbnail}</p>
								)}
							</div>
							{/* Chú thích */}
							<div className='mb-2 flex items-center justify-between'>
								<label className='block text-sm font-medium leading-6 text-gray-900'>Chú thích</label>
							</div>
							<div className='mb-2'>
								{/* <input
									id='note'
									type='textarea'
									value={values.note}
									onChange={handleChange}
									className={`w-full appearance-none rounded border p-2 shadow focus:outline-none`}
								/> */}
								<div>
									<CKEditor
										id='note'
										editor={ClassicEditor}
										data={values.note}
										onReady={(editor) => {
											// You can store the "editor" and use when it is needed.
											// console.log('Editor is ready to use!', editor);
										}}
										onChange={(event, editor) => {
											const data = editor.getData();
											handleChange({ target: { id: 'note', value: data } });
										}}
										onBlur={(event, editor) => {
											// console.log('Blur.', editor);
										}}
										onFocus={(event, editor) => {
											// console.log('Focus.', editor);
										}}
									/>
								</div>
							</div>
							<div className='mt-4'>
								<button
									type='submit'
									className='flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
								>
									Sửa
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
