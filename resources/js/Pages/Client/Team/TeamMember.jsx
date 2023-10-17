import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';

export default function TeamMember(auth) {
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
						<form encType='multipart/form-data'>
							{/* email thành viên */}
							<div className='mb-2'>
								<label htmlFor='team_name' className='mb-2 block text-sm font-medium leading-6 text-gray-900'>
									Nhập email thành viên
								</label>
								<div>
									<input
										id='team_email'
										type='email'
										className=' w-full appearance-none rounded border p-2 shadow focus:outline-none'
									/>
								</div>
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
