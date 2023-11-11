export default function SlideNovel({ novels }) {
	return (
		<div className='carousel w-full'>
			{novels.data.map((item, index) => (
				<div id={'slide' + index} key={index} className='carousel-item relative w-full'>
					<img src={item.thumbnail} className='w-full' />
					<div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
						<a href={'#slide' + (index - 1)} className='btn btn-circle'>
							❮
						</a>
						<a href={'#slide' + (index + 1)} className='btn btn-circle'>
							❯
						</a>
					</div>
				</div>
			))}
		</div>
	);
}
