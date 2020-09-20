<?php
	// missing varibles
	if (!isset($_GET['url']) || !isset($_GET['folder']) || !isset($_GET['file'])) {
		echo "Error";
		exit();
	}

	// set vars
	$url = $_GET['url'];
	$folder = $_GET['folder'];
	$file = $_GET['file'];
	$pad = explode(' ', "/seg- -v1-a1.ts" );

	// define stream and download function
	function stream($link, $folder, $file) {
		shell_exec("curl " . $link . " >> '$folder/$file'");
	}

	// find chucks in config file
	function findchucks($link) {
		// download config file
		$config = shell_exec("curl " . $link);

		// split into array
		$file = explode('#', $config);

		// lenght of array
		$lenght = count($file);

		// backwards through array
		for ($i = $lenght; $i >= 0; $i--) {
			if (strpos($file[$i], 'seg-') !== false) {
				$chucks = explode('-', $file[$i]);
				foreach ($chucks as $value) {
					if (is_numeric($value)) {
						$ret = $value;
						$i = -1;
						break;
					}
				}
			}
		}

		return $ret;
	}

	// set max chuncks
	$max = findchucks($url);

	// mkdir & empty file
	shell_exec("mkdir '$folder'");
	shell_exec("echo '' > $folder/$file");

	// stream all chuncks
	for ($i = 1; $i < $max; $i++) {
		$link = $url . $pad[0] . $i . $pad[1];
		stream($link, $folder, $file);

		// expose progress
		echo floor($i/$max*100);
	}

	// done
	usleep(100*1000);
	echo "Done";

?>
