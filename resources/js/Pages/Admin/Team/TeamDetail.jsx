import AdminLayout from '@/Layouts/AdminLayout';

export default function TeamDetail({ team }) {
	return (
		<AdminLayout>
			<div className='p-2'>
				<h2 className='m-10 text-center text-xl md:text-5xl'>Nhóm chi tiết</h2>
				<div className='mb-5'>
					<strong>Tên nhóm: </strong> <span>{team.team_name}</span> <br />
					<strong>Chi tiết: </strong>{' '}
					<span dangerouslySetInnerHTML={{ __html: `${team.team_detail}` }}></span>
				</div>
			</div>
		</AdminLayout>
	);
}
