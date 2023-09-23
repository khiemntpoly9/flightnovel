import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
export default function CategoriesEdit({ category }) {
	const { errors } = usePage().props;
	const [values, setValues] = useState({
		id_categories: category.id_categories,
		name: category.name,
	});
	// handle change input
	const handleChange = (e) => {
		const key = e.target.id;
		const value = e.target.value;
		setValues((values) => ({
			...values,
			[key]: value,
		}));
	};
	// handle submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		router.patch('/admin/categories', values);
	};
	return (
		<AdminLayout>
			<Link href={route('admin.categories')}>Quay lại</Link>
			<div className='p-4'>
				<form onSubmit={handleSubmit}>
					<div>
						<h1 className='font-medium'>Sửa thể loại</h1>
						<div className='flex items-center justify-between'>
							<label htmlFor='name' className='block text-sm leading-6 text-gray-900'>
								Thể loại
							</label>
						</div>
						<div className='mt-2'>
							<input
								id='name'
								type='text'
								className={`${
									errors && errors.name ? 'mb-2 border-rose-600' : ''
								} block w-full rounded-md border-0 px-5 py-2 text-black ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6`}
								onChange={handleChange}
								value={values.name}
							/>
							{errors && errors.name && <p className='text-sm italic text-red-500'>{errors.name}</p>}
						</div>
					</div>
					<div>
						<button
							type='submit'
							className='my-3 flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
						>
							Sửa
						</button>
					</div>
				</form>
			</div>
		</AdminLayout>
	);
}
