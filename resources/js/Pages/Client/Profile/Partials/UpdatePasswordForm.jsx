import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import DefaultLayout from '@/Layouts/DefaultLayout';

export default function UpdatePasswordForm({ auth }) {
	const passwordInput = useRef();
	const currentPasswordInput = useRef();

	const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
		current_password: '',
		password: '',
		password_confirmation: '',
	});

	const updatePassword = (e) => {
		e.preventDefault();

		put(route('password.update'), {
			preserveScroll: true,
			onSuccess: () => reset(),
			onError: (errors) => {
				if (errors.password) {
					reset('password', 'password_confirmation');
					passwordInput.current.focus();
				}

				if (errors.current_password) {
					reset('current_password');
					currentPasswordInput.current.focus();
				}
			},
		});
	};

	return (
		<DefaultLayout auth={auth}>
			<section className='container mx-auto w-10/12'>
				<header>
					<h2 className='text-lg font-medium text-gray-900'>Thay đổi mật khẩu</h2>
				</header>

				<form onSubmit={updatePassword} className='mt-6 '>
					<div>
						<label htmlFor='current_password' value='Current Password'>
							Mật khẩu hiện tại
						</label>
						<TextInput
							id='current_password'
							ref={currentPasswordInput}
							value={data.current_password}
							onChange={(e) => setData('current_password', e.target.value)}
							type='password'
							className={`${
								errors && errors.current_password ? 'mb-2 border-rose-600' : ''
							} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
							autoComplete='current-password'
						/>

						{errors && errors.current_password && (
							<p className='text-sm italic text-red-500'>{errors.current_password}</p>
						)}
					</div>

					<div>
						<label htmlFor='password' value='New Password'>
							Mật khẩu mới
						</label>

						<TextInput
							id='password'
							ref={passwordInput}
							value={data.password}
							onChange={(e) => setData('password', e.target.value)}
							type='password'
							className={`${
								errors && errors.password ? 'mb-2 border-rose-600' : ''
							} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
							autoComplete='new-password'
						/>

						{errors && errors.password && <p className='text-sm italic text-red-500'>{errors.password}</p>}
					</div>

					<div>
						<label htmlFor='password_confirmation' value='Confirm Password'>
							Xác nhận mật khẩu
						</label>

						<TextInput
							id='password_confirmation'
							value={data.password_confirmation}
							onChange={(e) => setData('password_confirmation', e.target.value)}
							type='password'
							className={`${
								errors && errors.password_confirmation ? 'mb-2 border-rose-600' : ''
							} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
							autoComplete='new-password'
						/>

						{errors && errors.password_confirmation && (
							<p className='text-sm italic text-red-500'>{errors.password_confirmation}</p>
						)}
					</div>

					<div className='mt-2 flex items-center gap-4'>
						<PrimaryButton disabled={processing}>Thay đổi</PrimaryButton>

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
			</section>
		</DefaultLayout>
	);
}
