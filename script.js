var url = document.getElementById('url');
var folder = document.getElementById('folder');
var file = document.getElementById('file');
var btn = document.getElementById('btn');
var progress = document.getElementById('progress');
var stat = document.getElementById('stat');



btn.addEventListener('click', () => {
	if (url.value == "") {
		progress.innerText = "Error";
		progress.style.width = "100%";
		return;
	}
	if (folder.value == "") folder.value = "downloads";
	if (file.value == "") file.value = "video-" + Math.floor(Math.random()*1000000) + ".ts";
	stream(url.value, folder.value, file.value);
});


async function stream(url, folder, file) {
	var stream = "streamer.php?url=" + url + "&folder=" + folder.replace('&', '%26') + "&file=" + file.replace('&', '%26');
	var startTime = new Date().getTime();

	const response = await fetch(stream);
	const reader = response.body
		.pipeThrough(new TextDecoderStream())
		.getReader();

		while (true) {
			const { value, done } = await reader.read();
			if (done) break;

			if (value == "Error") {
				progress.innerText = "Error";
				progress.style.width = "100%";
				break;
			} else if(value == "Done") {
				progress.innerText = "File fully received";
				progress.style.width = "100%";
				break;
			}

			var running = Math.floor((new Date().getTime() - startTime) / 1000);
			var estimation = Math.floor(running / value * 100);
			var remaining = Math.floor(estimation - running);

			progress.style.width = value + "%";
			progress.innerText = value + "%";
			stat.innerText = "Running since: " + running + "sec \r\n Estimated time: " + estimation + "sec \r\n Remaining Time: " + remaining + "sec";

		}

}
