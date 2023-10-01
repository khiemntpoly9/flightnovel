import { useEffect } from 'react';
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
								type='password'
								name='password'
								value={data.password}
								className={`${
									errors && errors.password ? 'mb-2 border-rose-600' : ''
								} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
								autoComplete='new-password'
								onChange={(e) => setData('password', e.target.value)}
							/>
							{errors && errors.password && <p className='text-sm italic text-red-500'>{errors.password}</p>}
						</div>

						<div className='mt-4'>
							<label className='mb-2' htmlFor='email'>
								Xác nhận mật khẩu mới
							</label>
							<TextInput
								type='password'
								name='password_confirmation'
								value={data.password_confirmation}
								className={`${
									errors && errors.password_confirmation ? 'mb-2 border-rose-600' : ''
								} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
								autoComplete='new-password'
								onChange={(e) => setData('password_confirmation', e.target.value)}
							/>
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
