import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminMain({ data }, { views }) {
	console.log(views);
	return (
		<AdminLayout>
			<div>
				{/* dashboard */}
				<div className='m-5 flex flex-col space-x-4 rounded-lg bg-gray-100 p-4  shadow-md md:flex-row lg:flex-row'>
					<div className=' flex-1 '>
						<div className='text-gray-500'>Truyện đã đăng</div>
						<div className='text-2xl font-bold'>{data[0]}</div>
					</div>
					<div className='flex-1 '>
						<div className='text-gray-500'>Tổng tài khoản</div>
						<div className='text-2xl font-bold'>{data[1]}</div>
					</div>
				</div>
				{/* end dashboard */}
			</div>
		</AdminLayout>
	);
}
