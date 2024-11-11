<?php 
	
	$conn = new mysqli('localhost', 'root', '', 'newsuniver');

	if (!$conn) 
	{
		echo 'Error connect';
	}

?>