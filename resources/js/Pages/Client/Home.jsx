import Header from '@/Pages/Client/Components/Header';
import Footer from '@/Pages/Client/Components/Footer';
import SlideNoiBat from '@/Pages/Client/Components/SlideNoiBat';
import { Link, Head } from '@inertiajs/react';
export default function Home({ auth }) {
	return (
		<>
			<Head title='Trang chủ' />
			<Header auth={auth} />
			<main className='mx-auto bg-white'>
				<div className='slide'>
					<SlideNoiBat />
				</div>
			</main>
			<Footer />
		</>
	);
}
