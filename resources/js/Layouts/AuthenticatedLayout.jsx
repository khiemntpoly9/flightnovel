import Header from '@/Pages/Client/Components/Header';
import Footer from '@/Pages/Client/Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Authenticated({ user, notify, children }) {
	return (
		<>
			<Header auth={user} notify={notify} />
			<ToastContainer />
			{children}
			<Footer />
		</>
	);
}
