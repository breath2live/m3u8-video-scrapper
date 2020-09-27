var url = document.getElementById('url');
var folder = document.getElementById('folder');
var file = document.getElementById('file');
var btn = document.getElementById('btn');
var progress = document.getElementById('progress');
var stat = document.getElementById('stat');
var logs = document.getElementById('logs');
var lastFile = document.getElementById('lastFile');
var startTime = undefined;



btn.addEventListener('click', () => {
	if (url.value == "") {
		alert("Please enter an URL to stream and download video");
		//progress.innerText = "Error";
		//progress.style.width = "100%";
		return;
	}
	if (folder.value == "") folder.value = "downloads";
	if (file.value == "") file.value = "video-" + Math.floor(Math.random()*1000000) + ".ts";

	var arr = file.value.slice(file.value.length - 3, file.value.length);
	if (arr != ".ts") file.value += ".ts";

	stream(url.value, folder.value, file.value);

	lastFile.innerText = file.value;
	logs.innerText = logs.innerText + "URL: " + url.value + "\nFolder: " + folder.value + "\nFile: " + file.value + "\n\n";
	url.value = '';
	file.value = '';
});


async function stream(url, folder, file) {
	var stream = "streamer.php?url=" + url + "&folder=" + folder.replace('&', '%26') + "&file=" + file.replace('&', '%26');

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
			} else if (value == "Done") {
				progress.innerText = "File fully received";
				progress.style.width = "100%";
				break;
			} else if (value == "Start") {
				startTime = new Date().getTime();
			}

			var running = Math.floor(((new Date().getTime()) - startTime) / 1000);
			var estimation = Math.floor(running / value * 100);
			var remaining = Math.floor(estimation - running);

			progress.style.width = value + "%";
			progress.innerText = value + "%";
			stat.innerText = "Current Download: " + file + "\r\nRunning since: " + running + "sec \r\n Estimated time: " + estimation + "sec \r\n Remaining Time: " + remaining + "sec";

		}

}
