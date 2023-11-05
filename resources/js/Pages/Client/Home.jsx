import SlideNoiBat from '@/Pages/Client/Components/SlideNoiBat';
import TruyenMoi from '@/Pages/Client/Components/TruyenMoi';
import LichSuDoc from '@/Pages/Client/Components/LichSuDoc';
import ChuongMoi from '@/Pages/Client/Components/ChuongMoi';
import TheoDoiNhieu from '@/Pages/Client/Components/TheoDoiNhieu';
import TruyenDaHoanThanh from '@/Pages/Client/Components/TruyenDaHoanThanh';
import TruyenVuaDang from '@/Pages/Client/Components/TruyenVuaDang';
import { Head } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
export default function Home({ auth, novels, historyReadList }) {
	return (
		<>
			<DefaultLayout auth={auth}>
				<Head title='Trang chủ' />
				<main className='mx-auto bg-white'>
					<div className='slide'>
						<SlideNoiBat />
					</div>
					<div className='mt-2 w-full'>
						<div className='flex flex-col justify-center gap-2 lg:flex-row'>
							<div className={`order-2 ${auth.user ? 'lg:w-6/12' : ''} mx-auto w-10/12 lg:order-1 lg:m-0`}>
								<TruyenMoi novels={novels} />
							</div>
							{auth.user && (
								<div className='order-1 mx-auto w-10/12 lg:order-2 lg:m-0 lg:w-4/12'>
									<LichSuDoc historyReadList={historyReadList} />
								</div>
							)}
							{/* <div className='order-1 mx-auto w-10/12	lg:order-2 lg:m-0 lg:w-4/12'>
								<LichSuDoc />
							</div> */}
						</div>
						<div className='flex flex-col justify-center gap-2 md:flex-row lg:flex-row'>
							<div className='order-1 mx-auto w-10/12 md:w-6/12 md:pl-10 lg:order-1 lg:m-0 lg:w-6/12 lg:pl-0'>
								<ChuongMoi />
							</div>
							<div className='order-2 mx-auto w-10/12 md:w-4/12 lg:order-2 lg:m-0 lg:w-4/12'>
								{/* Component theo dõi nhiều để ở đây */}
								<TheoDoiNhieu />
							</div>
						</div>
						<div className='flex flex-col justify-center gap-2 lg:flex-row'>
							<div className='order-2 mx-auto w-10/12  lg:order-1 lg:m-0 lg:w-6/12'>
								{/* component swiper truyện đã hoàn thành để ở đây */}
								<TruyenDaHoanThanh />
							</div>
							<div className='order-1 mx-auto w-10/12 lg:order-2 lg:m-0 lg:w-4/12'>
								<TruyenVuaDang />
							</div>
						</div>
					</div>
				</main>
			</DefaultLayout>
		</>
	);
}
