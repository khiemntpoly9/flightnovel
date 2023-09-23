import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminMain() {
	return (
		<AdminLayout>
			<div>
				{/* dashboard */}
				<div className='m-5 flex flex-col space-x-4 rounded-lg bg-gray-100 p-4  shadow-md md:flex-row lg:flex-row'>
					<div className=' flex-1 '>
						<div className='text-gray-500'>Truyện đã đăng</div>
						<div className='text-2xl font-bold'>1,234</div>
					</div>
					<div className='flex-1 '>
						<div className='text-gray-500'>Tổng tài khoản</div>
						<div className='text-2xl font-bold'>567</div>
					</div>
					<div className='flex-1 '>
						<div className='text-gray-500'>Số lượt xem</div>
						<div className='text-2xl font-bold'>890</div>
					</div>
				</div>
				{/* end dashboard */}
			</div>
			<button className='btn' onClick={() => document.getElementById('my_modal_3').showModal()}>
				open modal
			</button>
			<dialog id='my_modal_3' className='modal'>
				<div className='modal-box'>
					<form method='dialog'>
						{/* if there is a button in form, it will close the modal */}
						<button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
					</form>
					<h3 className='text-lg font-bold'>Hello!</h3>
					<p className='py-4'>Press ESC key or click on ✕ button to close</p>
				</div>
			</dialog>
		</AdminLayout>
	);
}
