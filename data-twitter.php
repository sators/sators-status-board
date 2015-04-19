<?php
//error_reporting(E_ALL);

require_once 'statusboard/db_connect.php';
// **********************************
// *     Code by Matt Satorius      *
// *        www.sators.com          *
// **********************************

//Get our twitter search query from the database, all Twitter requests done via Javascript
	$data = mysql_query("SELECT value1 AS query FROM statusboard WHERE type = 'twittersearch'") or die(mysql_error()); 
	$_twittersearch = mysql_fetch_array( $data ); 

// I heart JSON...but not in a gay "Jason" way...why didn't they call it Jamie?
echo json_encode($_twittersearch); 

?>
