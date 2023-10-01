import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage, Head } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { useEffect } from 'react';

export default function UpdateProfileInformation({ auth, mustVerifyEmail, status, className = '' }) {
	const { flash } = usePage().props;
	const user = usePage().props.auth.user;

	const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
		name: user.name,
	});

	const submit = (e) => {
		e.preventDefault();

		patch(route('profile.update'));
	};
	useEffect(() => {
		if (flash.success) {
			toast.success(flash.success, {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}, [flash.success]);

	return (
		<DefaultLayout auth={auth}>
			<Head title='Tài khoản' />
			<section className={className}>
				<div className='mt m-auto mt-8 w-8/12'>
					<header>
						<h2 className='text-lg font-medium text-gray-900'>Thông tin tài khoản</h2>

						<p className='mt-1 text-sm text-gray-600'>Cập nhật tên tài khoản.</p>
					</header>
					<form onSubmit={submit} className='mt-6 space-y-6'>
						<div>
							<label htmlFor='name'>Tên tài khoản</label>
							<input
								id='name'
								name='name'
								value={data.name}
								autoComplete='name'
								onChange={(e) => setData('name', e.target.value)}
								className={`${
									errors && errors.name ? 'mb-2 border-rose-600' : ''
								} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
								required
							/>
						</div>
						<div className='flex items-center gap-4'>
							<PrimaryButton disabled={processing}>Lưu</PrimaryButton>

							<Transition
								show={recentlySuccessful}
								enter='transition ease-in-out'
								enterFrom='opacity-0'
								leave='transition ease-in-out'
								leaveTo='opacity-0'
							>
								<p className='text-sm text-gray-600'>Lưu</p>
							</Transition>
						</div>
					</form>
				</div>
			</section>
		</DefaultLayout>
	);
}
