import AdminLayout from '@/Layouts/AdminLayout';
import View from '@/Pages/Client/Components/View';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function TeamDetail({ team, views }) {
	const [activeTab, setActiveTab] = useState(1);
	const handleTabChange = (tabIndex) => {
		setActiveTab(tabIndex);
	};
	return (
		<AdminLayout>
			<Head title={`Nhóm ${team.team_name}`} />
			<div className='p-2'>
				<h2 className='m-10 text-center text-xl md:text-5xl'>Nhóm</h2>
				<div className='mb-5'>
					<strong>Tên nhóm: </strong> <span>{team.team_name}</span> <br />
					<strong>Chi tiết: </strong>{' '}
					<span dangerouslySetInnerHTML={{ __html: `${team.team_detail}` }}></span>
				</div>
				{/* Xếp hạng lượt xem truyện */}
				<div className='mt-3'>
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
							{activeTab === 1 && <View viewday={views[0]} />}
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
							{activeTab === 2 && <View viewweek={views[1]} />}
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
							{activeTab === 3 && <View viewmonth={views[2]} />}
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
