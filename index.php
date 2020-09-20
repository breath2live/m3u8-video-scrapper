<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


		<!-- BEGIN GLOBAL MANDATORY STYLES -->
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<!-- END GLOBAL MANDATORY STYLES -->


		<!--  BEGIN PAGE DESC  -->
		<title>Web Video Scrapper</title>
		<!--  END PAGE DESC  -->
	</head>
	<body>
		<div class="container">
			<br><br>
			<h1>Select m3u8 File to Stream and Download:</h1><br>

			<p>Video URL:</p>
			<input type="text" id="url" class="form-control" placeholder="Please enter URL of m3u8 file"><br>
			<p>Folder:</p>
			<input type="text" id="folder" class="form-control" placeholder="Please enter Folder to save File. Default: downloads"><br>
			<p>Filename:</p>
			<input type="text" id="file" class="form-control" placeholder="Please enter Filename. Existing File will be deleted. Default: video-xyzxyz.ts"><br>

			<input type="button" id="btn" class="btn btn-primary form-control" value="Steam and Download"><br><br>
			<div class="progress">
				<div class="progress-bar" id="progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
			</div><br><br>

			<div class="container" id="stat"></div>


		</div>

		<!-- BEGIN CUSTOM SCRIPTS -->
		<script src="script.js"></script>
		<!-- END CUSTOM SCRIPTS -->
	</body>
</html>
