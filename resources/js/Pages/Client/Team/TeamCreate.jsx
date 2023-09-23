import DefaultLayout from '@/Layouts/DefaultLayout';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default function TeamCreate({ auth }) {
	const { errors, successMessage } = usePage().props;
	if (successMessage) {
		toast.success(successMessage, {
			position: 'top-right',
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		setTimeout(() => {
			router.get('/');
		}, 1500);
	}
	const [values, setValues] = useState({
		team_name: '',
		team_detail: '',
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
		router.post('/team/create', values);
	};
	return (
		<DefaultLayout auth={auth}>
			<div className='container mx-auto w-10/12'>
				<div className='mb-3 text-lg font-bold'>Tạo nhóm dịch</div>
				<div className='form-create-team'>
					<form onSubmit={handleSubmit}>
						<div className='mb-4 flex flex-col'>
							<label className='mb-2'>Tên nhóm dịch</label>
							<input
								className={`${
									errors && errors.team_name ? 'mb-2 border-rose-600' : ''
								} appearance-none rounded border p-2 shadow focus:outline-none`}
								type='text'
								id='team_name'
								value={values.team_name}
								onChange={handleChange}
							/>
							{errors && errors.team_name && (
								<p className='text-sm italic text-red-500'>{errors.team_name}</p>
							)}
						</div>
						<div className='mb-4 flex flex-col'>
							<label className='mb-2'>Mô tả nhóm</label>
							{/* CKEditor 5 */}
							<div>
								<CKEditor
									id='team_detail'
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
						</div>
						<div>
							<button
								type='submit'
								className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none'
							>
								Tạo nhóm
							</button>
						</div>
					</form>
				</div>
			</div>
		</DefaultLayout>
	);
}
