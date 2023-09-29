import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage, Head } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { useEffect } from 'react';

export default function UpdateProfileInformation({ auth, mustVerifyEmail, status, className = '' }) {
	const { flash } = usePage().props;
	const user = usePage().props.auth.user;

	const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
		name: user.name,
		// email: user.email,
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
							{/* <InputLabel htmlFor='name' value='Tên tài khoản' />

							<TextInput
								id='name'
								className='mt-1 block w-full'
								value={data.name}
								onChange={(e) => setData('name', e.target.value)}
								required
								isFocused
								autoComplete='name'
							/>

							<InputError className='mt-2' message={errors.name} /> */}
						</div>

						{/* <div>
							<InputLabel htmlFor='email' value='Email' />

							<TextInput
								id='email'
								type='email'
								className='mt-1 block w-full'
								value={data.email}
								onChange={(e) => setData('email', e.target.value)}
								autoComplete='username'
							/>

							<InputError className='mt-2' message={errors.email} />
						</div>

						{mustVerifyEmail && user.email_verified_at === null && (
							<div>
								<p className='mt-2 text-sm text-gray-800'>
									Your email address is unverified.
									<Link
										href={route('verification.send')}
										method='post'
										as='button'
										className='rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
									>
										Click here to re-send the verification email.
									</Link>
								</p>

								{status === 'verification-link-sent' && (
									<div className='mt-2 text-sm font-medium text-green-600'>
										A new verification link has been sent to your email address.
									</div>
								)}
							</div>
						)} */}

						<div className='flex items-center gap-4'>
							<PrimaryButton disabled={processing}>Save</PrimaryButton>

							<Transition
								show={recentlySuccessful}
								enter='transition ease-in-out'
								enterFrom='opacity-0'
								leave='transition ease-in-out'
								leaveTo='opacity-0'
							>
								<p className='text-sm text-gray-600'>Saved.</p>
							</Transition>
						</div>
					</form>
				</div>
			</section>
		</DefaultLayout>
	);
}
