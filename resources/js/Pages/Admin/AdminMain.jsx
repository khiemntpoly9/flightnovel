import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import View from '../Client/Components/View';
export default function AdminMain({ data, views }) {
	const [activeTab, setActiveTab] = useState(1);
	const handleTabChange = (tabIndex) => {
		setActiveTab(tabIndex);
	};
	return (
		<AdminLayout>
			<div>
				{/* dashboard */}
				<div className='m-5 flex flex-col rounded-lg bg-gray-100 p-4 shadow-md md:flex-row md:space-x-4'>
					<div className='flex-1'>
						<div className='text-gray-500'>Truyện đã đăng</div>
						<div className='text-2xl font-bold'>{data[0]}</div>
					</div>
					<div className='flex-1'>
						<div className='text-gray-500'>Tổng tài khoản</div>
						<div className='text-2xl font-bold'>{data[1]}</div>
					</div>
				</div>
				{/* end dashboard */}
				{/* truyen */}
				<div className='mx-auto w-10/12'>
					<h1 className='title-main mb-1'>Top lượt xem</h1>
					<div className='tabs tabs-lifted '>
						<input
							type='radio'
							name='my_tabs_2'
							className='tab'
							aria-label=' ngày'
							checked={activeTab === 1}
							onChange={() => handleTabChange(1)}
						/>
						<div className='tab-content  rounded-box border-base-300 bg-base-100 p-2 md:p-10'>
							{activeTab === 1 && <View viewday={views[0]} />}
						</div>
						<input
							type='radio'
							name='my_tabs_2'
							className='tab'
							aria-label=' tuần'
							checked={activeTab === 2}
							onChange={() => handleTabChange(2)}
						/>
						<div className='tab-content rounded-box border-base-300 bg-base-100 p-2 md:p-10'>
							{activeTab === 2 && <View viewweek={views[1]} />}
						</div>
						<input
							type='radio'
							name='my_tabs_2'
							className='tab'
							aria-label='tháng'
							checked={activeTab === 3}
							onChange={() => handleTabChange(3)}
						/>
						<div className='tab-content rounded-box border-base-300 bg-base-100 p-2 md:p-10'>
							{activeTab === 3 && <View viewmonth={views[2]} />}
						</div>
					</div>
				</div>
				{/*  */}
			</div>
		</AdminLayout>
	);
}
