import SideBar from '@/Pages/Admin/Components/SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AdminLayout({ children }) {
	return (
		
		<div className='min-h-screen md:flex'>
			<ToastContainer />
			<SideBar />
			<div className='flex flex-grow flex-col'>{children}</div>
		</div>
	);
}
