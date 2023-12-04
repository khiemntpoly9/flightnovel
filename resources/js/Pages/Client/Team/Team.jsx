import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import ViewTeam from '../Components/ViewTeam';
import Pagination from '@/Components/Pagination';
export default function Team({ auth, team_user, team_list, status }) {
	// Toast
	useEffect(() => {
		// Success
		if (status.success) {
			toast.success(status.success, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		// Error
		if (status.error) {
			toast.error(status.error, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}, [status]);
	console.log(team_list);
	return (
		<DefaultLayout auth={auth}>
			<Head title='Nhóm' />
			<div className='container mx-auto w-10/12'>
				<div>
					{team_user ? (
						<Link className='btn' href={route('team.dashboard')}>
							Quản lý nhóm
						</Link>
					) : (
						<Link className='btn' href={route('team.create')}>
							Tạo nhóm
						</Link>
					)}
				</div>
				{/* Danh sách nhóm */}
				<div className='mt-3'>
					<header className='mb-2 text-xl'>Danh sách nhóm</header>
					{team_list.data.map((team, index) => (
						<div className='mb-2 rounded-md bg-slate-100 p-2 hover:bg-slate-200' key={index}>
							<Link className='bg-slate-100' href={`/team/${team.slug}`}>
								<div className=' hover:text-orange-400'>{team.team_name}</div>
							</Link>
						</div>
					))}
					<div className='mt-3'>
						{team_list.links && team_list.links.length > 3 && <Pagination links={team_list.links} />}
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
