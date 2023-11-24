import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';

export default function ResetPassword({ token, email }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		token: token,
		email: email,
		password: '',
		password_confirmation: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const toggleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};
	useEffect(() => {
		return () => {
			reset('password', 'password_confirmation');
		};
	}, []);

	const submit = (e) => {
		e.preventDefault();
		post(route('password.store'));
	};

	return (
		<DefaultLayout>
			<Head title='Khôi phục mật khẩu' />
			<div className='container'>
				<div className='m-auto w-1/2'>
					<form onSubmit={submit}>
						<div>
							<label className='mb-2' htmlFor='email'>
								Email
							</label>
							<input
								id='email'
								type='email'
								name='email'
								value={data.email}
								className={`${
									errors && errors.email ? 'mb-2 border-rose-600' : ''
								} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
								autoComplete='username'
								onChange={(e) => setData('email', e.target.value)}
								disabled
							/>
							{errors && errors.email && <p className='text-sm italic text-red-500'>{errors.email}</p>}
						</div>

						<div className='mt-4'>
							<label className='mb-2' htmlFor='email'>
								Mật khẩu mới
							</label>
							<input
								id='password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={data.password}
								className={`${
									errors && errors.password ? 'mb-2 border-rose-600' : ''
								} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
								autoComplete='new-password'
								onChange={(e) => setData('password', e.target.value)}
							/>
							<input
								type='checkbox'
								id='showPassword'
								checked={showPassword}
								onChange={toggleShowPassword}
								className='hidden '
							/>
							<label
								htmlFor='showPassword'
								className='absolute translate-x-1 translate-y-1/2 transform cursor-pointer'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='h-6 w-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
									/>
									<path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
								</svg>
							</label>
							{errors && errors.password && <p className='text-sm italic text-red-500'>{errors.password}</p>}
						</div>

						<div className='mt-4'>
							<label className='mb-2' htmlFor='email'>
								Xác nhận mật khẩu mới
							</label>
							<TextInput
								type={showConfirmPassword ? 'text' : 'password'}
								name='password_confirmation'
								value={data.password_confirmation}
								className={`${
									errors && errors.password_confirmation ? 'mb-2 border-rose-600' : ''
								} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
								autoComplete='new-password'
								onChange={(e) => setData('password_confirmation', e.target.value)}
							/>
							<input
								type='checkbox'
								id='showConfirmPassword'
								checked={showConfirmPassword}
								onChange={toggleShowConfirmPassword}
								className='hidden '
							/>
							<label
								htmlFor='showConfirmPassword'
								className='absolute translate-x-1 translate-y-1/2 transform cursor-pointer'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='h-6 w-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
									/>
									<path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
								</svg>
							</label>
							{errors && errors.password_confirmation && (
								<p className='text-sm italic text-red-500'>{errors.password_confirmation}</p>
							)}
						</div>

						<div className='mt-4 flex items-center justify-end'>
							<PrimaryButton className='ml-4' disabled={processing}>
								Xác nhận
							</PrimaryButton>
						</div>
					</form>
				</div>
			</div>
		</DefaultLayout>
	);
}
