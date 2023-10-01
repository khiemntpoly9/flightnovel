import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';

export default function ForgotPassword({ status }) {
	const { data, setData, post, processing, errors } = useForm({
		email: '',
	});

	const submit = (e) => {
		e.preventDefault();
		post(route('password.email'));
	};

	return (
		<DefaultLayout>
			<Head title='Quên mật khẩu' />

			<div className='container p-3'>
				<div className='m-auto w-6/12'>
					<div className='mb-4 text-sm text-gray-600'>Xác nhận Email khôi phục mật khẩu</div>

					{status && <div className='mb-4 text-sm font-medium text-green-600'>{status}</div>}

					<form onSubmit={submit}>
						<input
							id='email'
							type='email'
							name='email'
							value={data.email}
							className={`${
								errors && errors.email ? 'mb-2 border-rose-600' : ''
							} w-full appearance-none rounded border p-2 shadow focus:outline-none`}
							onChange={(e) => setData('email', e.target.value)}
						/>
						{errors && errors.email && <p className='text-sm italic text-red-500'>{errors.email}</p>}
						<div className='mt-4 flex items-center justify-end'>
							<PrimaryButton className='ml-4' disabled={processing}>
								Khôi phục mật khẩu
							</PrimaryButton>
						</div>
					</form>
				</div>
			</div>
		</DefaultLayout>
	);
}
