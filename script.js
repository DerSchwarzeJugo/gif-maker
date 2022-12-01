const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({
	log: true,
});

const vidToGif = async ({ target: { files } }) => {
	const { name } = files[0];
	await ffmpeg.load();
	ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
	await ffmpeg.run('-i', name, 'output.gif');
	const data = ffmpeg.FS('readFile', 'output.gif');
	const image = document.createElement('img');
	document.querySelector('.innerContentWrapper').appendChild(image)
	image.src = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif'}));
};	

const vidToMp4 = async ({ target: { files } }) => {
	const { name } = files[0];
	await ffmpeg.load();
	ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
	await ffmpeg.run('-i', name, 'output.mp4');
	const data = ffmpeg.FS('readFile', 'output.mp4');
	const video = document.createElement('video');
	document.querySelector('.innerContentWrapper').appendChild(video)
	video.controls = true
	video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4'}));
};	

document.getElementById('uploader').addEventListener('change', vidToMp4);