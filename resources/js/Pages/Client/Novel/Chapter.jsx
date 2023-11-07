import DefaultLayout from '@/Layouts/DefaultLayout';
import moment from 'moment/moment';

export default function Chapter({ auth, vol, chap }) {
	return (
		<DefaultLayout auth={auth}>
			<div className='bg-yellow-400'>
				<div className='flex flex-col items-center'>
					<div className='w-10/12 '>
						<div className='mt-3 text-center text-base font-bold'>
							<h1>{vol.title}</h1>
						</div>
						<div className='mt-2 text-center text-base font-semibold '>
							<p>{chap.title}</p>
						</div>
						<div className='mt-2 text-center  text-base'>
							<p>Cập nhật : {moment(chap.updated_at).format('DD/MM/YYYY - HH:mm:ss')}</p>
						</div>
					</div>
					<div className='mt-4 w-10/12'>
						<div className='p-3'>
							<span className='font-semibold' dangerouslySetInnerHTML={{ __html: `${chap.content}` }}></span>
						</div>
					</div>
					<div className='mt-4 flex h-full w-10/12 items-center justify-center  '>
						<div
							dir='ltr'
							className='flex h-12 w-28 items-center justify-center rounded-s-lg border-2  border-solid border-gray-600 bg-slate-300 md:w-40 lg:w-64'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='h-8 w-8 lg:h-10 lg:w-10'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z'
								/>
							</svg>
						</div>
						<div className='flex h-12 w-28 items-center justify-center border-2 border-solid border-gray-600 bg-slate-300 md:w-40 lg:w-64	'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='  h-8 w-8 lg:h-10 lg:w-10'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
								/>
							</svg>
						</div>
						<div
							dir='rtl'
							className='flex h-12 w-28 items-center justify-center rounded-s-lg border-2 border-solid border-gray-600 bg-slate-300 md:w-40 lg:w-64 '
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className=' h-8 w-8 lg:h-10 lg:w-10'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z'
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
