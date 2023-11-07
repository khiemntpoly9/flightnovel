import Header from '@/Pages/Client/Components/Header';
import Footer from '@/Pages/Client/Components/Footer';

export default function Authenticated({ user, notify, children }) {
	return (
		<>
			<Header auth={user} notify={notify} />
			{children}
			<Footer />
		</>
	);
}
