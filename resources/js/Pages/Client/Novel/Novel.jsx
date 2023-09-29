import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function Novel({ auth, categories }) {
	const { errors } = usePage().props;
	const [values, setValues] = useState({
		name_novel: '',
		another_name: '',
		thumbnail: '',
		author: '',
		illustrator: '',
		categories: [],
		summary: '',
		note: '',
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
	// Handle change checkbox
	const handleCheckbox = (e) => {
		const cateId = e.target.id_categories;
		const isChecked = e.target.checked;

		const updateCategories = [...values.categories];

		if (isChecked) {
			updateCategories.push(cateId);
		} else {
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
		console.log(values);
		// router.post('/novel', values);
	};
	return (
		<DefaultLayout auth={auth}>
			<Head title='Novel' />
			<div className='container mx-auto w-10/12 bg-white'>
				<div className='flex min-h-full flex-1 flex-col justify-center lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
							Thêm truyện
						</h2>
					</div>
					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-md'>
						<form onSubmit={handleSubmit}>
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
										className={` w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									/>
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
										className={`w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									/>
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
										className={`w-full appearance-none rounded border p-2 shadow focus:outline-none`}
									/>
								</div>
							</div>
							{/* Thể loại */}
							<div className='mb-2 flex items-center justify-between'>
								<span className='block text-sm font-medium leading-6 text-gray-900'>Thể loại</span>
							</div>
							<div className='mb-2 flex flex-wrap items-center'>
								{categories.map((category) => (
									<div key={category.id_categories} className='mb-2 w-1/2 md:mb-0 md:flex md:w-1/3'>
										<input
											className='mr-1'
											type='checkbox'
											name={category.name}
											id={category.id_categories}
											checked={values.categories.includes(category.id_categories)}
											onChange={handleCheckbox}
										/>
										<label
											htmlFor={category.id_categories}
											className='block text-sm font-medium leading-6 text-gray-900'
										>
											{category.name}
										</label>
									</div>
								))}
							</div>
							{/* Tóm tắt */}
							<div className='mb-2 flex items-center justify-between'>
								<label htmlFor='summary' className='block text-sm font-medium leading-6 text-gray-900'>
									Tóm tắt
								</label>
							</div>
							<div className='mb-2'>
								<input
									id='summary'
									type='textarea'
									value={values.summary}
									onChange={handleChange}
									className={`w-full appearance-none rounded border p-2 shadow focus:outline-none`}
								/>
							</div>

							{/* Chú thích */}
							<div className='mb-2 flex items-center justify-between'>
								<label htmlFor='note' className='block text-sm font-medium leading-6 text-gray-900'>
									Chú thích
								</label>
							</div>
							<div className='mb-2'>
								<input
									id='note'
									type='textarea'
									value={values.note}
									onChange={handleChange}
									className={`w-full appearance-none rounded border p-2 shadow focus:outline-none`}
								/>
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
				</div>
			</div>
		</DefaultLayout>
	);
}
