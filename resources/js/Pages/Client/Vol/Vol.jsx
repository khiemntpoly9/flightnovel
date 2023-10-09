import DefaultLayout from '@/Layouts/DefaultLayout';
import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';

export default function Vol({ auth, id_novel }) {
	const { errors } = usePage().props;
	const [values, setValues] = useState({
		title: '',
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
		router.post(`/team/novel/${id_novel}/vol`, values);
	};
	return (
		<DefaultLayout auth={auth}>
			<Head title='Vol' />
			<div className='container mx-auto w-10/12'>
				<form onSubmit={handleSubmit}>
					{/* Tên Vol */}
					<div className='mb-2'>
						<label htmlFor='title' className='mb-2 block text-sm font-medium leading-6 text-gray-900'>
							Tên Vol
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
