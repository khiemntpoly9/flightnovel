import { Link } from '@inertiajs/react';
export default function Pagination({ links }) {
	console.log(links);
	return (
		<div>
			<div className='mb-1 mt-2 flex content-center justify-center gap-1'>
				{links.map((link, key) => (
					<div className='flex' key={key}>
						{link.url === null ? (
							<div
								className='rounded border px-4 py-3 text-sm leading-4 text-gray-400'
								dangerouslySetInnerHTML={{ __html: link.label }}
							/>
						) : (
							<Link
								className={`rounded border px-4 py-3 text-sm leading-4 ${
									link.active ? 'bg-red-500 text-white' : 'text-gray-400 hover:bg-white'
								}`}
								href={`${link.url}`}
								dangerouslySetInnerHTML={{ __html: link.label }}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
