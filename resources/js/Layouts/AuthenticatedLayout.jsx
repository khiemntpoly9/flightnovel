import Header from '@/Pages/Client/Components/Header';
import Footer from '@/Pages/Client/Components/Footer';

export default function Authenticated({ user, children }) {
	return (
		<>
			<Header auth={user} />
			{children}
			<Footer />
		</>
	);
}
