import TruyenMoi from '@/Pages/Client/Components/TruyenMoi';
import LichSuDoc from '@/Pages/Client/Components/LichSuDoc';
import ChuongMoi from '@/Pages/Client/Components/ChuongMoi';
import TheoDoiNhieu from '@/Pages/Client/Components/TheoDoiNhieu';
import TruyenDaHoanThanh from '@/Pages/Client/Components/TruyenDaHoanThanh';
import { Head } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import SlideNovel from './Components/SlideNovel';
import SlideNoiBat from './Components/SlideNoiBat';
import View from './Components/View';
import { useState } from 'react';
export default function Home({
	auth,
	novels,
	historyReadList,
	novelsNewChap,
	followed,
	completenovels,
	view,
}) {
	const [activeTab, setActiveTab] = useState(1);
	const handleTabChange = (tabIndex) => {
		setActiveTab(tabIndex);
	};
	return (
		<>
			<DefaultLayout auth={auth}>
				<Head title='Trang chủ' />
				<main className='mx-auto bg-white'>
					<div className='slide'>
						{/* <div className='mx-auto w-10/12'>
							<SlideNovel novels_1={novels} />
						</div> */}
						{/* <SlideNoiBat /> */}
					</div>
					<div className='mx-auto  w-10/12'>
						<div className='tabs tabs-lifted'>
							<input
								type='radio'
								name='my_tabs_2'
								className='tab w-40'
								aria-label='Top lượt xem ngày'
								checked={activeTab === 1}
								onChange={() => handleTabChange(1)}
							/>
							<div className='tab-content rounded-box border-base-300 bg-base-100 p-10'>
								{activeTab === 1 && <View viewday={view[0]} />}
							</div>
							<input
								type='radio'
								name='my_tabs_2'
								className='tab w-40'
								aria-label='Top lượt xem tuần'
								checked={activeTab === 2}
								onChange={() => handleTabChange(2)}
							/>
							<div className='tab-content rounded-box border-base-300 bg-base-100 p-10'>
								{activeTab === 2 && <View viewweek={view[1]} />}
							</div>
							<input
								type='radio'
								name='my_tabs_2'
								className='tab w-40'
								aria-label='Top lượt xem tháng'
								checked={activeTab === 3}
								onChange={() => handleTabChange(3)}
							/>
							<div className='tab-content rounded-box border-base-300 bg-base-100 p-10'>
								{activeTab === 3 && <View viewmonth={view[2]} />}
							</div>
						</div>
					</div>

					<div className='mt-2 w-full'>
						<div className='flex flex-col justify-center gap-4 lg:flex-row'>
							<div className={`order-2 ${auth.user ? 'lg:w-6/12' : ''} mx-auto w-10/12 lg:order-1 lg:m-0`}>
								<TruyenMoi novels={novels} />
							</div>
							{auth.user && (
								<div className='order-1 mx-auto w-10/12 lg:order-2 lg:m-0 lg:w-4/12'>
									<LichSuDoc historyReadList={historyReadList} />
								</div>
							)}
						</div>
						<div className='flex flex-col justify-center gap-2 md:flex-row lg:flex-row'>
							<div className='order-1 mx-auto w-10/12 md:w-6/12 md:pl-10 lg:order-1 lg:m-0 lg:w-6/12 lg:pl-0'>
								<ChuongMoi novelsNewChap={novelsNewChap} />
							</div>
							<div className='order-2 mx-auto w-10/12 md:w-4/12 lg:order-2 lg:m-0 lg:w-4/12'>
								{/* Component theo dõi nhiều để ở đây */}
								<TheoDoiNhieu followed={followed} />
							</div>
						</div>
						<div className='flex justify-center lg:flex-row'>
							<div className=' mx-auto w-10/12'>
								{/* component swiper truyện đã hoàn thành để ở đây */}
								{completenovels.length > 0 && <TruyenDaHoanThanh completenovels={completenovels} />}
								{/* <TruyenDaHoanThanh completenovels={completenovels} /> */}
							</div>
						</div>
					</div>
				</main>
			</DefaultLayout>
		</>
	);
}
