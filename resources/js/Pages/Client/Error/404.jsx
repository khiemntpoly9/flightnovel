import { Link } from '@inertiajs/react';
export default function Error404({ status, message }) {
	return (
		<div>
			<div className='mx-auto h-full'>
				<div className='grid h-screen place-content-center'>
					<div className='text-center'>
						<span className='text-8xl'>404!</span>
						<p>Nội dung không tồn tại</p>
						<div className='mt-3'>
							<Link href={route('home')} className='btn bg-header-a text-white'>
								Trở về Trang chủ
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
