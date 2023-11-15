import { Link } from '@inertiajs/react';
import { useState } from 'react';
export default function ChuongMoi({ novelsNewChap }) {
	const [arrIdNovel, setArrIdNovel] = useState(Object.values(novelsNewChap[1]));
	const [listNovels, setListNovels] = useState(novelsNewChap[0].data);
	const [listNovelsAffter, setListNovelsAffter] = useState(
		arrIdNovel.map((id) => listNovels.find((novel) => novel.id === id))
	);
	return (
		<div className='new_LN relative py-6 '>
			<div className='top relative flex h-7 w-full justify-between'>
				<h1 className='font-bold uppercase text-black'>Chương mới</h1>
				<Link href='/novel/chapter-new'>xem thêm ...</Link>
			</div>
			<div className='bottom relative grid grid-cols-3 gap-2 py-2 lg:grid-cols-4 xl:grid-cols-5'>
				{listNovelsAffter.map((novel) => (
					<div key={novel.id} className='card bg-base-100 shadow-xl'>
						<figure className='h-40 md:h-44 lg:h-40 xl:h-44'>
							<img className='h-full w-full object-cover' src={novel.thumbnail} alt='thumbnail' />
						</figure>
						<div className='p-2 text-center'>
							<Link href={`/novel/${novel.slug}`} className='hover:text-red-500'>
								{novel.name_novel}
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
