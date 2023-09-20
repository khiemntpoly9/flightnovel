import Footer from '@/Pages/Client/Components/Footer';
import Header from '@/Pages/Client/Components/Header';

export default function DefaultLayout({ auth, children }) {
	return (
		<>
			{auth ? <Header auth={auth.user} /> : <Header />}
			{children}
			<Footer />
		</>
	);
}
