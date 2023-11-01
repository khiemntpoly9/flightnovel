import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function TeamUpdate({ auth, team }) {
	const { errors } = usePage().props;
	const [values, setValues] = useState({
		team_name: team.team_name,
		team_detail: team.team_detail,
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
		router.patch(`/team/${team.slug}`, values);
	};
	return (
		<DefaultLayout auth={auth}>
			<Head title='Cập nhật nhóm' />
			<div className='container mx-auto w-10/12 bg-white'>
				<div className='flex min-h-full flex-1 flex-col justify-center lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							Sửa thông tin nhóm
						</h2>
					</div>
					<div className='mt-5 sm:mx-auto sm:w-full sm:max-w-md'>
						<form onSubmit={handleSubmit} encType='multipart/form-data'>
							{/* Tên nhóm */}
							<div className='mb-2'>
								<label htmlFor='team_name' className='mb-2 block text-sm font-medium leading-6 text-gray-900'>
									Tên nhóm
								</label>
								<div>
									<input
										id='team_name'
										type='text'
										defaultValue={values.team_name}
										onChange={handleChange}
										className={`${
											errors && errors.team_name ? 'mb-2 border-rose-600' : ''
										} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									/>
									{errors && errors.team_name && (
										<p className='text-sm italic text-red-500'>{errors.team_name}</p>
									)}
								</div>
							</div>
							{/* Chi tiết */}
							<div className='mb-2'>
								<div className='mb-2 flex items-center justify-between'>
									<label className='block text-sm font-medium leading-6 text-gray-900'>Chi tiết</label>
								</div>
								<div className='mb-2'>
									<div>
										<CKEditor
											id='summary'
											editor={ClassicEditor}
											data={values.team_detail}
											onReady={(editor) => {
												// You can store the "editor" and use when it is needed.
												// console.log('Editor is ready to use!', editor);
											}}
											onChange={(event, editor) => {
												const data = editor.getData();
												handleChange({ target: { id: 'team_detail', value: data } });
											}}
											onBlur={(event, editor) => {
												// console.log('Blur.', editor);
											}}
											onFocus={(event, editor) => {
												// console.log('Focus.', editor);
											}}
										/>
									</div>
									{errors && errors.team_detail && (
										<p className='text-sm italic text-red-500'>{errors.team_detail}</p>
									)}
								</div>
							</div>
							<div className='mt-4'>
								<button
									type='submit'
									className='flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
								>
									Cập nhật
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
