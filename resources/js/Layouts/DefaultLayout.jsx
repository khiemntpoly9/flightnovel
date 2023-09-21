import Footer from '@/Pages/Client/Components/Footer';
import Header from '@/Pages/Client/Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function DefaultLayout({ auth, children }) {
	return (
		<>
			{auth ? <Header auth={auth.user} /> : <Header />}
			<ToastContainer />
			{children}
			<Footer />
		</>
	);
}
