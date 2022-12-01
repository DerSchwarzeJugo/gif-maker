const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({
	log: true,
});

const transcode = async ({ target: { files } }) => {
	const { name } = files[0];
	await ffmpeg.load();
	ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
	await ffmpeg.run('-i', name, 'output.mp4');
	const data = ffmpeg.FS('readFile', 'output.mp4');
	const video = document.getElementById('player');
	video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4'}));
};	

document.getElementById('uploader').addEventListener('change', transcode);