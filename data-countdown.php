<?php
//error_reporting(E_ALL);
// **********************************
// *     Code by Matt Satorius      *
// *        www.sators.com          *
// **********************************
require_once 'statusboard/db_connect.php';

// Function to figure out the math
function dateDiff($dformat, $endDate, $beginDate)
{
	$date_parts1=explode($dformat, $beginDate);
	$date_parts2=explode($dformat, $endDate);
	$start_date=gregoriantojd($date_parts1[0], $date_parts1[1], $date_parts1[2]);
	$end_date=gregoriantojd($date_parts2[0], $date_parts2[1], $date_parts2[2]);
	return $end_date - $start_date;
}

// Countdown Data
 $data = mysql_query("SELECT indexnumber, value1, value2 FROM statusboard WHERE type = 'countdown' ORDER BY value1 ASC") or die(mysql_error()); 
// Just in case I want to show multiple countdowns
while($temp = mysql_fetch_array( $data )) {
$daysleft = dateDiff("/", $temp['value1'], date("m/d/Y"));
$_countdown [] = array( 'key' => $temp['indexnumber'], 'targetdate' => $temp['value1'], 'title' => $temp['value2'], 'daysleft' => $daysleft ) ;
}

// JSON the sucka
echo json_encode($_countdown); 
    
?>
