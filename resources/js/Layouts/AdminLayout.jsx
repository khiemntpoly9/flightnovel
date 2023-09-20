import SideBar from '@/Pages/Admin/Components/SideBar';

export default function AdminLayout({ children }) {
	return (
		<div className='min-h-screen md:flex'>
			<SideBar />
			<div className='flex flex-grow flex-col'>{children}</div>
		</div>
	);
}
