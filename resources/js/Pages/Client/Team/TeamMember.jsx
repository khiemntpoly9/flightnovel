import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

export default function TeamMember({ auth, team, status }) {
	const { errors } = usePage().props;
	const [values, setValues] = useState({
		email: '',
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
		router.post(`/team/${team.slug}/add-member`, values);
	};
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
			<Head title='Thêm thành viên' />
			<div className='container mx-auto w-10/12 bg-white'>
				<div className='flex min-h-full flex-1 flex-col justify-center lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							Thêm thành viên
						</h2>
					</div>
					<div className='mt-5 sm:mx-auto sm:w-full sm:max-w-md'>
						<form onSubmit={handleSubmit}>
							{/* email thành viên */}
							<div className='mb-2'>
								<label htmlFor='email' className='mb-2 block text-sm font-medium leading-6 text-gray-900'>
									Nhập email thành viên
								</label>
								<div className='mb-2'>
									<input
										id='email'
										type='email'
										onChange={handleChange}
										className=' w-full appearance-none rounded border p-2 shadow focus:outline-none'
									/>
								</div>
								{errors && errors.email && <p className='text-sm italic text-red-500'>{errors.email}</p>}
							</div>
							<div className='mt-4'>
								<button
									type='submit'
									className='flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
								>
									Thêm thành viên
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
