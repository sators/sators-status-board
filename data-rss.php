<?php
//error_reporting(E_ALL);
require_once 'statusboard/db_connect.php';
require_once 'statusboard/rss_php.php';
// **********************************
// *     Code by Matt Satorius      *
// *        www.sators.com          *
// **********************************
// Get All the Feeds
$data = mysql_query("SELECT value1 AS feedicon, value2 AS feedurl FROM statusboard WHERE type = 'rssfeed' ORDER BY indexnumber ASC") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$_rssfeed[] = $temp;
}
// What Feed was last displayed
$data = mysql_query("SELECT value1 AS lastdisplayedfeed FROM statusboard WHERE type = 'lastfeed'") or die(mysql_error()); 
while($temp = mysql_fetch_array( $data )) {
	$lastfeed = $temp["lastdisplayedfeed"];
}
// If it was the last feed in the list, show the first one, otherwise, the next feed and update the database with what feed we're showing
if ((count($_rssfeed)-1) == $lastfeed) { 
$newfeed = $_rssfeed[0]; 
mysql_query("UPDATE statusboard SET value1 = 0 WHERE type = 'lastfeed'");
} else { 
$newfeednumber = $lastfeed + 1;
$newfeed = $_rssfeed[$newfeednumber]; 
mysql_query("UPDATE statusboard SET value1 = ".$newfeednumber." WHERE type = 'lastfeed'");

}
// Using RSS_PHP to convert the RSS feed to JSON, but only retrieving the Items, not the full RSS list.
$rss = new rss_php;
$rss->load($newfeed["feedurl"]);
$newfeed["rss"] = $rss->getItems();
echo json_encode($newfeed); 

?>
