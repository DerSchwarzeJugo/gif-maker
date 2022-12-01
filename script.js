if (crossOriginIsolated) {
	const { createFFmpeg, fetchFile } = FFmpeg;
	const ffmpeg = createFFmpeg({
		log: true,
	});
	
	const vidToGif = async ({ target: { files } }) => {
		const { name } = files[0];
		const outputName = 'output.gif';

		if (!ffmpeg.isLoaded()) {
			await ffmpeg.load();
		}
		
		ffmpeg.FS('writeFile', name, await fetchFile(files[0]));

		if (document.querySelector('.progress.hidden') != null) {
			document.querySelector('.progress.hidden').classList.remove('hidden');
		}
		ffmpeg.setProgress(({ ratio }) => {
			updateProgressBar(ratio)
		});

		await ffmpeg.run('-i', name, outputName);

		const data = ffmpeg.FS('readFile', outputName);
		const image = document.getElementById('imgOutput');
		const imageLink = document.getElementById('imgOutputLink');
		imageLink.setAttribute("download", outputName);
		image.src = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif'}));
		imageLink.href = image.src;
		imageLink.classList.remove('hidden');
	};	

	const updateProgressBar = (ratio) => {
		let progressBar = document.querySelector('.progress-bar');
		let percent = (Number.parseFloat(ratio) * 100).toString();
		progressBar.style.width =  percent + '%';
	};
	
	setInterval(() => {
		let progressBarWidth = document.querySelector('.progress-bar').style.width;
		if (progressBarWidth == '100%') {
			document.querySelector('.progress').classList.add('hidden');
		}
	}, 5000);

	document.getElementById('uploader').addEventListener('change', vidToGif);
} else {
	alert('CrossOriginIsolated is false!');
}